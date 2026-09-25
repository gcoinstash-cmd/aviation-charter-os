-- Ghost Factory™ Production Schema for AVIATION CHARTER OS
-- PostgreSQL 15+ Compatible with Row Level Security (RLS)

-- 1. Main Fleet / Asset Inventory Table
CREATE TABLE IF NOT EXISTS aircraft_fleet (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_tag VARCHAR(50) UNIQUE NOT NULL,
    model_name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    daily_rate_cents INTEGER NOT NULL,
    operational_status VARCHAR(50) DEFAULT 'AVAILABLE',
    telematics_runtime_hours NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Dispatch / Booking Records Table
CREATE TABLE IF NOT EXISTS charter_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID REFERENCES aircraft_fleet(id) ON DELETE SET NULL,
    client_name VARCHAR(150) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    dispatch_date DATE NOT NULL,
    return_date DATE,
    contract_status VARCHAR(50) DEFAULT 'ACTIVE',
    security_deposit_cents INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Telemetry / Quality Inspections Table
CREATE TABLE IF NOT EXISTS empty_legs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID REFERENCES aircraft_fleet(id) ON DELETE CASCADE,
    inspector_id VARCHAR(100) NOT NULL,
    inspection_notes TEXT,
    compliance_passed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Audit & Delivery Dispatches Table
CREATE TABLE IF NOT EXISTS vip_manifests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dispatch_code VARCHAR(100) UNIQUE NOT NULL,
    destination_site TEXT NOT NULL,
    carrier_license VARCHAR(100),
    bill_of_lading_hash VARCHAR(255),
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE aircraft_fleet ENABLE ROW LEVEL SECURITY;
ALTER TABLE charter_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE empty_legs ENABLE ROW LEVEL SECURITY;
ALTER TABLE vip_manifests ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Public Read Access" ON aircraft_fleet FOR SELECT USING (true);
CREATE POLICY "Public Insert Access" ON charter_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin All Access Fleet" ON aircraft_fleet FOR ALL USING (true);
CREATE POLICY "Admin All Access Contracts" ON charter_bookings FOR ALL USING (true);
CREATE POLICY "Admin All Access Inspections" ON empty_legs FOR ALL USING (true);
CREATE POLICY "Admin All Access Dispatches" ON vip_manifests FOR ALL USING (true);
