import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "sde"; // sde or product
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 12;
  const offset = (page - 1) * limit;

  try {
    // 1. Fetch latest from JobCode to keep our DB fresh
    const externalUrl = `https://jobcode.in/wp-json/wp/v2/posts?per_page=10${
      type === "sde" ? "&tags=141,161,148,169" : "&search=product"
    }`;

    const externalRes = await fetch(externalUrl);
    const posts = await externalRes.json();

    if (Array.isArray(posts)) {
      const parsedJobs = posts.map((post) => {
        let cleanTitle = post.title.rendered
          .replace(/&#8211;|–|—/g, "-")
          .replace(/&#8217;|’/g, "'")
          .replace(/&amp;/g, "&")
          .replace(/&nbsp;/g, " ");

        let company = "Unknown";
        let role = cleanTitle;

        if (cleanTitle.includes("-")) {
          const parts = cleanTitle.split("-");
          const p1 = parts[0].trim();
          const p2 = parts[1].split("|")[0].trim();
          if (
            p1.toLowerCase().includes("hiring") ||
            p1.toLowerCase().includes("off campus") ||
            p1.toLowerCase().includes("drive")
          ) {
            company = p1.replace(/Hiring|Off Campus|Drive|Campus/gi, "").trim();
            role = p2;
          } else {
            role = p1;
            company = p2;
          }
        } else if (cleanTitle.includes(" at ")) {
          const parts = cleanTitle.split(" at ");
          role = parts[0].trim();
          company = parts[1].trim();
        }

        const content = post.content.rendered;

        // Extract metadata
        let eligibility = "See details in post";
        const eligibilityMatch =
          content.match(
            /Eligibility &amp; Educational Qualifications<\/h2>\s*<p>(.*?)<\/p>/i
          ) ||
          content.match(
            /Educational Qualification<\/h3>\s*<ul[^>]*>\s*<li>(.*?)<\/li>/i
          ) ||
          content.match(/<li>Bachelor’s degree (.*?)<\/li>/i);
        if (eligibilityMatch)
          eligibility = eligibilityMatch[1].replace(/<[^>]*>/g, "").trim();

        let experience = "Freshers / Entry-level";
        const expMatch =
          content.match(/<td>Experience<\/td>\s*<td>(.*?)<\/td>/i) ||
          content.match(/Experience:<\/strong>\s*(.*?)</i) ||
          content.match(/([0-9]+[\s-]*[0-9]*\s*Years?)/i);
        if (expMatch) experience = expMatch[1].replace(/<[^>]*>/g, "").trim();

        let location = "Multiple Locations";
        const locMatch =
          content.match(/<td>Location<\/td>\s*<td>(.*?)<\/td>/i) ||
          content.match(/Location:<\/strong>\s*(.*?)</i) ||
          content.match(/Based in\s*(.*?)[.<]/i);
        if (locMatch) location = locMatch[1].replace(/<[^>]*>/g, "").trim();

        let workMode = "Onsite";
        if (
          content.toLowerCase().includes("remote") ||
          cleanTitle.toLowerCase().includes("remote")
        )
          workMode = "Remote";
        else if (content.toLowerCase().includes("hybrid")) workMode = "Hybrid";

        // Cleanup company
        company = company
          .replace(/&#[0-9]+;|🔍|💼|🚀|🛠️|📋|🎓|💻|🌟|📈|🌍|📝|🔑|✨|🏢/g, "")
          .split("|")[0]
          .split("(")[0]
          .replace(/&amp;/g, "&")
          .trim();
        if (company.toLowerCase() === "unknown" || company.length < 2)
          company = "JobCode Opening";

        return {
          external_id: post.id,
          type: type,
          title: cleanTitle,
          company: company,
          role: role
            .split("|")[0]
            .replace(/Job Details|Quick Overview|Complete Guide/gi, "")
            .replace(/^-/g, "")
            .trim(),
          link: post.link,
          job_date: post.date,
          eligibility,
          experience,
          location,
          work_mode: workMode,
          content: content,
        };
      });

      // Sync with Supabase (Upsert based on external_id)
      const { error: upsertError } = await supabase
        .from("external_jobs_discovery")
        .upsert(parsedJobs, {
          onConflict: "external_id",
          ignoreDuplicates: false,
        });

      if (upsertError) {
        console.error("Upsert Error during sync:", upsertError);
      }
    }

    // 2. Fetch paginated data from Supabase (Persistent history)
    const { data: jobs, error: dbError } = await supabase
      .from("external_jobs_discovery")
      .select("*")
      .eq("type", type)
      .order("job_date", { ascending: false })
      .range(offset, offset + limit - 1);

    if (dbError) throw dbError;

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Job Sync Error:", error);
    return NextResponse.json(
      { error: "Failed to sync or fetch jobs" },
      { status: 500 }
    );
  }
}
