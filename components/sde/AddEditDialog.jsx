import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  SDE_CATEGORIES,
  APPLICATION_STATUSES,
  PRIORITIES,
  REFERRAL_STATUSES,
  REFERRAL_FRIENDLY,
} from "@/lib/constants";

export default function AddEditDialog({ job, onSave, onClose }) {
  const [formData, setFormData] = useState({
    company: "",
    category: "BigTech",
    country: "India",
    domain: "",
    role: "SDE Intern",
    hiring_season: "Summer",
    intern_type: "",
    ppo_probability: "Medium",
    referral_friendly: "Medium",
    referral_status: "Not Contacted",
    referral_name: "",
    linkedin_profile: "",
    application_status: "Not Applied",
    careers_page: "",
    notes: "",
    priority: 3,
    interview_notes: "",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company || "",
        category: job.category || "BigTech",
        country: job.country || "India",
        domain: job.domain || "",
        role: job.role || "SDE Intern",
        hiring_season: job.hiring_season || "Summer",
        intern_type: job.intern_type || "",
        ppo_probability: job.ppo_probability || "Medium",
        referral_friendly: job.referral_friendly || "Medium",
        referral_status: job.referral_status || "Not Contacted",
        referral_name: job.referral_name || "",
        linkedin_profile: job.linkedin_profile || "",
        application_status: job.application_status || "Not Applied",
        careers_page: job.careers_page || "",
        notes: job.notes || "",
        priority: job.priority || 3,
        interview_notes: job.metadata?.interview_notes || "",
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract interview_notes to save in metadata
    const { interview_notes, ...jobData } = formData;

    const dataToSave = {
      ...jobData,
      metadata: {
        ...(job?.metadata || {}),
        interview_notes: interview_notes || "",
      },
    };

    onSave(dataToSave);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-xl md:text-2xl font-bold">
            {job?.id ? "Edit Job Application" : "Add Job Application"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto max-h-[calc(90vh-140px)] scrollbar-thin"
        >
          {/* Company Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {SDE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Role *</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Domain</label>
              <input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Application Info */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                name="application_status"
                value={formData.application_status}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {APPLICATION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p} - {p === 5 ? "Highest" : p === 1 ? "Lowest" : "Medium"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Referral Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Referral Friendly
              </label>
              <select
                name="referral_friendly"
                value={formData.referral_friendly}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {REFERRAL_FRIENDLY.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Referral Status
              </label>
              <select
                name="referral_status"
                value={formData.referral_status}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {REFERRAL_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Referral Contact */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Referral Contact Name
            </label>
            <input
              type="text"
              name="referral_name"
              value={formData.referral_name}
              onChange={handleChange}
              placeholder="Who can refer you?"
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Links and Notes */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Careers Page URL
              </label>
              <input
                type="url"
                name="careers_page"
                value={formData.careers_page}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                General Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                placeholder="Quick notes..."
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Interview Experience / Notes
                <span className="text-xs text-muted-foreground ml-2">
                  (Questions asked, feedback, process details...)
                </span>
              </label>
              <textarea
                name="interview_notes"
                value={formData.interview_notes || ""}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your interview experience, questions asked, feedback received, next rounds..."
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-y"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 md:p-6 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors text-sm md:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors text-sm md:text-base"
          >
            {job?.id ? "Update" : "Add"} Job
          </button>
        </div>
      </div>
    </div>
  );
}
