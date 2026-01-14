-- Career Tracker Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/xqfmcemfsgdfmwotyoqo/sql

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- SDE Jobs Table
create table if not exists sde_jobs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  
  -- Company Info
  company text not null,
  category text,
  country text,
  domain text,
  
  -- Role Info
  role text,
  hiring_season text,
  intern_type text,
  ppo_probability text,
  
  -- Referral Info
  referral_friendly text,
  referral_status text,
  referral_name text,
  linkedin_profile text,
  
  -- Application Info
  application_status text default 'Not Applied',
  careers_page text,
  notes text,
  priority integer default 3 check (priority >= 1 and priority <= 5),
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Product Jobs Table
create table if not exists product_jobs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  
  -- Company Info
  company text not null,
  category text,
  country text,
  product_domain text,
  
  -- Role Info
  target_role text,
  hiring_season text,
  internship_type text,
  conversion_potential text,
  
  -- Interview & Skills
  case_interview_focus text,
  sql_level text,
  product_sense_level text,
  analytics_tools text,
  
  -- Compensation
  stipend_monthly text,
  expected_fte_ctc text,
  
  -- Referral Info
  referral_friendly text,
  referral_status text,
  referral_name text,
  linkedin_profile text,
  
  -- Application Info
  application_status text default 'Not Applied',
  followup_date date,
  careers_page text,
  notes text,
  priority integer default 3 check (priority >= 1 and priority <= 5),
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Row Level Security Policies for SDE Jobs
alter table sde_jobs enable row level security;

create policy "Users can view their own SDE jobs"
  on sde_jobs for select
  using (auth.uid() = user_id);

create policy "Users can insert their own SDE jobs"
  on sde_jobs for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own SDE jobs"
  on sde_jobs for update
  using (auth.uid() = user_id);

create policy "Users can delete their own SDE jobs"
  on sde_jobs for delete
  using (auth.uid() = user_id);

-- Row Level Security Policies for Product Jobs
alter table product_jobs enable row level security;

create policy "Users can view their own product jobs"
  on product_jobs for select
  using (auth.uid() = user_id);

create policy "Users can insert their own product jobs"
  on product_jobs for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own product jobs"
  on product_jobs for update
  using (auth.uid() = user_id);

create policy "Users can delete their own product jobs"
  on product_jobs for delete
  using (auth.uid() = user_id);

-- Indexes for performance
create index if not exists sde_jobs_user_id_idx on sde_jobs(user_id);
create index if not exists product_jobs_user_id_idx on product_jobs(user_id);

-- Updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply triggers
create trigger update_sde_jobs_updated_at before update on sde_jobs
  for each row execute procedure update_updated_at_column();

create trigger update_product_jobs_updated_at before update on product_jobs
  for each row execute procedure update_updated_at_column();
