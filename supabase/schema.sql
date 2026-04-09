-- ============================================================
-- Schema Supabase pour FinancePro
-- Version : 2.0 — Production-ready
-- ============================================================

-- Activer les extensions nécessaires
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. PROFILES (extension de auth.users)
-- ============================================================

create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  phone text,
  address text,
  city text,
  postal_code text,
  country text default 'France',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index pour requêtes rapides
create index if not exists idx_profiles_created_at on profiles(created_at desc);

-- RLS
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Trigger pour mettre à jour updated_at automatiquement
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profiles_updated
  before update on profiles
  for each row execute procedure handle_updated_at();

-- Créer automatiquement un profil lors de la création d'un utilisateur Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ============================================================
-- 2. SIMULATIONS
-- ============================================================

create table if not exists simulations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete set null, -- null pour utilisateurs anonymes
  loan_type text not null,
  amount numeric not null check (amount > 0),
  duration integer not null check (duration > 0), -- en mois
  rate numeric not null check (rate >= 0),
  monthly_payment numeric not null check (monthly_payment > 0),
  total_cost numeric not null check (total_cost >= 0),
  taeg numeric, -- TAEG calculé
  debt_ratio numeric, -- Taux d'endettement
  professional_status text,
  income numeric,
  charges numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index pour performances
create index if not exists idx_simulations_user_id on simulations(user_id);
create index if not exists idx_simulations_created_at on simulations(created_at desc);
create index if not exists idx_simulations_loan_type on simulations(loan_type);

-- RLS
alter table simulations enable row level security;

create policy "Users can view their own simulations" on simulations
  for select using (auth.uid() = user_id or user_id is null);

create policy "Anyone can insert a simulation" on simulations
  for insert with check (true);


-- ============================================================
-- 3. LOAN APPLICATIONS (Demandes de prêt)
-- ============================================================

create table if not exists loan_applications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  dossier_number text unique not null, -- Ex: FP-2025-47823
  simulation_id uuid references simulations on delete set null,
  loan_type text not null,
  amount numeric not null check (amount > 0),
  duration integer not null check (duration > 0),
  status text default 'pending' check (status in ('pending', 'processing', 'approved', 'rejected', 'cancelled')),
  personal_data jsonb not null, -- Données personnelles (cryptées en transit)
  documents jsonb default '[]'::jsonb, -- Liste des documents uploadés
  notes text, -- Notes internes (visibles uniquement côté admin)
  assigned_advisor text, -- Conseiller assigné
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index pour performances
create index if not exists idx_loan_applications_user_id on loan_applications(user_id);
create index if not exists idx_loan_applications_status on loan_applications(status);
create index if not exists idx_loan_applications_dossier on loan_applications(dossier_number);
create index if not exists idx_loan_applications_created_at on loan_applications(created_at desc);

-- RLS
alter table loan_applications enable row level security;

create policy "Users can view their own applications" on loan_applications
  for select using (auth.uid() = user_id);

create policy "Users can insert their own applications" on loan_applications
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own pending applications" on loan_applications
  for update using (auth.uid() = user_id and status = 'pending');

create trigger on_loan_applications_updated
  before update on loan_applications
  for each row execute procedure handle_updated_at();


-- ============================================================
-- 4. CONTACT MESSAGES (Formulaire de contact)
-- ============================================================

create table if not exists contact_messages (
  id uuid default uuid_generate_v4() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  is_read boolean default false,
  responded_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index
create index if not exists idx_contact_messages_created_at on contact_messages(created_at desc);
create index if not exists idx_contact_messages_is_read on contact_messages(is_read);

-- RLS — only service_role can access (no public access)
alter table contact_messages enable row level security;

-- Politique pour permettre l'insertion anonyme (formulaire public)
create policy "Anyone can submit a contact message" on contact_messages
  for insert with check (true);

-- Pas de select/update/delete pour les utilisateurs publics
-- L'accès en lecture se fait via service_role côté admin


-- ============================================================
-- 5. NEWSLETTER SUBSCRIBERS
-- ============================================================

create table if not exists newsletter_subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  first_name text,
  is_active boolean default true,
  source text default 'website', -- Origine de l'inscription
  subscribed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unsubscribed_at timestamp with time zone
);

-- Index
create index if not exists idx_newsletter_email on newsletter_subscribers(email);
create index if not exists idx_newsletter_active on newsletter_subscribers(is_active);

-- RLS
alter table newsletter_subscribers enable row level security;

create policy "Anyone can subscribe to newsletter" on newsletter_subscribers
  for insert with check (true);

-- Pas de select/update/delete pour les utilisateurs publics


-- ============================================================
-- 6. COOKIE CONSENT LOGS (Conformité RGPD)
-- ============================================================

create table if not exists cookie_consent_logs (
  id uuid default uuid_generate_v4() primary key,
  session_id text not null,
  analytics_consent boolean default false,
  marketing_consent boolean default false,
  ip_hash text, -- Hash de l'IP (pas l'IP brute, RGPD)
  user_agent text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index
create index if not exists idx_cookie_consent_created_at on cookie_consent_logs(created_at desc);

-- RLS
alter table cookie_consent_logs enable row level security;

create policy "Anyone can log cookie consent" on cookie_consent_logs
  for insert with check (true);
