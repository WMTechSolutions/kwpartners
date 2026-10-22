-- KW Partners schema. Run once in the Supabase SQL editor.
-- All access goes through server code using the service-role key, so RLS is enabled
-- with no policies (the anon key can read nothing).

create extension if not exists pgcrypto;

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  image_url text,
  location text,
  zoom_url text,
  category text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  capacity int,
  published boolean not null default true,
  series_id uuid,
  created_at timestamptz not null default now()
);
create index if not exists events_starts_at_idx on events (starts_at);

create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  guests int not null default 1 check (guests between 1 and 10),
  created_at timestamptz not null default now(),
  unique (event_id, email)
);

create table if not exists rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  sort int not null default 0,
  active boolean not null default true
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references rooms(id) on delete cascade,
  start_at timestamptz not null,
  end_at timestamptz not null,
  user_id text,
  user_name text not null,
  user_email text not null,
  booked_by text,
  note text,
  created_at timestamptz not null default now(),
  cancelled_at timestamptz
);
-- one active booking per room per slot; this is what prevents double-booking
create unique index if not exists bookings_room_slot_uniq
  on bookings (room_id, start_at) where cancelled_at is null;
create index if not exists bookings_user_idx on bookings (user_email);

create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  section text not null check (section in ('quick','links','marketing','coaching','services')),
  title text not null,
  description text,
  url text not null,
  sort int not null default 0
);

create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  youtube_url text not null,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists form_submissions (
  id uuid primary key default gen_random_uuid(),
  form text not null,
  name text not null,
  email text not null,
  phone text,
  interest text,
  message text,
  created_at timestamptz not null default now()
);

alter table events enable row level security;
alter table rsvps enable row level security;
alter table rooms enable row level security;
alter table bookings enable row level security;
alter table resources enable row level security;
alter table videos enable row level security;
alter table form_submissions enable row level security;

-- Starting rooms (from the Wix booking services)
insert into rooms (name, location, sort)
select * from (values
  ('Front Conference Room',  'Woodstock', 1),
  ('Back Conference Room',   'Woodstock', 2),
  ('The Small Training Room','Woodstock', 3),
  ('The Deb',                'Woodstock', 4),
  ('Conference Room A',      'Canton',    5),
  ('Conference Room B',      'Canton',    6)
) as v(name, location, sort)
where not exists (select 1 from rooms);
