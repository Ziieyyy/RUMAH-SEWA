-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: profiles
create table profiles (
  id uuid references auth.users not null primary key,
  role text check (role in ('owner', 'staff', 'customer')) default 'customer',
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: locations
create table locations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: properties
create table properties (
  id uuid default uuid_generate_v4() primary key,
  location_id uuid references locations(id) on delete cascade not null,
  name text not null,
  type text check (type in ('Terrace', 'Condominium', 'Shoplot')) not null,
  address text,
  description text,
  amenities text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: rooms
create table rooms (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references properties(id) on delete cascade not null,
  name text not null,
  price numeric not null,
  deposit numeric not null,
  status text check (status in ('available', 'occupied', 'maintenance')) default 'available',
  description text,
  facilities text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: room_images
create table room_images (
  id uuid default uuid_generate_v4() primary key,
  room_id uuid references rooms(id) on delete cascade not null,
  url text not null,
  is_primary boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: leads
create table leads (
  id uuid default uuid_generate_v4() primary key,
  room_id uuid references rooms(id) on delete set null,
  name text not null,
  phone text not null,
  message text,
  status text check (status in ('new', 'contacted', 'converted', 'lost')) default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: bookings
create table bookings (
  id uuid default uuid_generate_v4() primary key,
  room_id uuid references rooms(id) on delete restrict not null,
  profile_id uuid references profiles(id) on delete restrict,
  start_date date,
  end_date date,
  status text check (status in ('pending', 'confirmed', 'cancelled', 'completed')) default 'pending',
  total_amount numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: activity_logs
create table activity_logs (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references profiles(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  details jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Setup
alter table profiles enable row level security;
alter table locations enable row level security;
alter table properties enable row level security;
alter table rooms enable row level security;
alter table room_images enable row level security;
alter table leads enable row level security;
alter table bookings enable row level security;
alter table activity_logs enable row level security;

-- Policies (Basic examples for the deliverables)
create policy "Public read access for locations" on locations for select using (true);
create policy "Public read access for properties" on properties for select using (true);
create policy "Public read access for rooms" on rooms for select using (status = 'available' or auth.role() = 'authenticated');
create policy "Public read access for room_images" on room_images for select using (true);

-- Allow inserting leads publicly
create policy "Public can insert leads" on leads for insert with check (true);

-- Admin full access examples (should be refined with function checking role, keeping it simple here)
-- In a real app, you'd use a function like "is_admin()"
create policy "All access for authenticated" on locations for all using (auth.role() = 'authenticated');
create policy "All access for authenticated" on properties for all using (auth.role() = 'authenticated');
create policy "All access for authenticated" on rooms for all using (auth.role() = 'authenticated');
create policy "All access for authenticated" on room_images for all using (auth.role() = 'authenticated');
create policy "All access for authenticated" on leads for all using (auth.role() = 'authenticated');
create policy "All access for authenticated" on bookings for all using (auth.role() = 'authenticated');
create policy "All access for authenticated" on activity_logs for all using (auth.role() = 'authenticated');
