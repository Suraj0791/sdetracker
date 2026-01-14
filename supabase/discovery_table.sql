-- Create the external_jobs_discovery table
CREATE TABLE IF NOT EXISTS external_jobs_discovery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_id BIGINT UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'sde' or 'product'
    title TEXT NOT NULL,
    company VARCHAR(255),
    role TEXT,
    link TEXT,
    eligibility TEXT,
    experience VARCHAR(255),
    location TEXT,
    work_mode VARCHAR(100),
    content TEXT,
    job_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster filtering and sorting
CREATE INDEX IF NOT EXISTS idx_discovery_type_date ON external_jobs_discovery(type, job_date DESC);

-- Enable RLS
ALTER TABLE external_jobs_discovery ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access" ON external_jobs_discovery
    FOR SELECT USING (true);

-- Allow public insert/update (Necessary because we use public anon key in API)
CREATE POLICY "Public full access" ON external_jobs_discovery
    USING (true)
    WITH CHECK (true);
