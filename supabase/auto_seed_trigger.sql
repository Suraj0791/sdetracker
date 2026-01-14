-- Add this to your schema.sql (run this AFTER the main schema)
-- This will auto-seed data for every new user

-- Function to seed initial SDE jobs for a new user
create or replace function seed_sde_jobs_for_user(p_user_id uuid)
returns void as $$
begin
  insert into sde_jobs (user_id, company, category, country, domain, role, hiring_season, intern_type, ppo_probability, referral_friendly, referral_status, application_status, careers_page, notes, priority)
  values
    (p_user_id, 'Google', 'BigTech', 'Global', 'Consumer, Infra', 'SDE Intern', 'Summer/Winter', 'Structured Program', 'High', 'Medium', 'Not Contacted', 'Not Applied', 'https://careers.google.com', 'Top tier', 5),
    (p_user_id, 'Microsoft', 'BigTech', 'Global', 'Cloud, OS', 'SDE Intern', 'Summer/Winter', 'Structured Program', 'High', 'High', 'Not Contacted', 'Not Applied', 'https://careers.microsoft.com', 'Good PPO', 5),
    (p_user_id, 'Amazon', 'BigTech', 'Global', 'Ecommerce, Cloud', 'SDE Intern', 'Summer', 'Mass Program', 'Medium', 'Medium', 'Not Contacted', 'Not Applied', 'https://amazon.jobs', 'OA heavy', 5),
    (p_user_id, 'Apple', 'BigTech', 'Global', 'Hardware, OS', 'SDE Intern', 'Summer', 'Team Based', 'Medium', 'Low', 'Not Contacted', 'Not Applied', 'https://jobs.apple.com', 'Team specific', 4),
    (p_user_id, 'Meta', 'BigTech', 'Global', 'Social, Infra', 'SDE Intern', 'Summer', 'Structured Program', 'High', 'Low', 'Not Contacted', 'Not Applied', 'https://www.metacareers.com', 'Hard bar', 5),
    (p_user_id, 'Flipkart', 'Indian Product', 'India', 'Ecommerce', 'SDE Intern', 'Rolling', 'Team Based', 'High', 'High', 'Not Contacted', 'Not Applied', 'https://www.flipkartcareers.com', 'Top Indian', 5),
    (p_user_id, 'Razorpay', 'FinTech', 'India', 'Payments', 'SDE Intern', 'Rolling', 'Referral Driven', 'High', 'High', 'Not Contacted', 'Not Applied', 'https://razorpay.com/jobs', 'Excellent PPO', 5),
    (p_user_id, 'Stripe', 'FinTech', 'Global', 'Payments Infra', 'SDE Intern', 'Rolling', 'Team Based', 'High', 'Medium', 'Not Contacted', 'Not Applied', 'https://stripe.com/careers', 'Very high bar', 5);
  -- Add all your other companies here (I'm showing just a few for example)
  -- You'll add all 100+ in the actual implementation
end;
$$ language plpgsql security definer;

-- Trigger to auto-seed when user signs up
create or replace function handle_new_user()
returns trigger as $$
begin
  -- Seed SDE jobs
  perform seed_sde_jobs_for_user(new.id);
  
  -- Seed Product jobs (we'll create similar function)
  -- perform seed_product_jobs_for_user(new.id);
  
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger on auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
