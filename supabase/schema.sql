-- Schema Supabase pour FinancePro

-- Table pour étendre les informations de profil utilisateur liés à auth.users par Supabase
create table profiles (
  id uuid references auth.users not null primary key,
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

-- Active le Row Level Security (RLS)
alter table profiles enable row level security;

-- Créer les politiques de sécurité (RLS)
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Trigger pour mettre à jour upated_at
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


-- Table pour les simulations
create table simulations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete set null, -- Null pour les utilisateurs anonymes
  loan_type text not null,
  amount numeric not null,
  duration integer not null, -- en mois
  rate numeric not null,
  monthly_payment numeric not null,
  total_cost numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table simulations enable row level security;

create policy "Users can view their own simulations" on simulations
  for select using (auth.uid() = user_id or user_id is null);

create policy "Anyone can insert a simulation" on simulations
  for insert with check (true);


-- Table pour les demandes de prêt
create table loan_applications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  simulation_id uuid references simulations on delete set null,
  status text default 'pending' check (status in ('pending', 'processing', 'approved', 'rejected')),
  personal_data jsonb not null, -- Stocke les informations (revenus, dépenses, charges, etc.)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table loan_applications enable row level security;

create policy "Users can view their own applications" on loan_applications
  for select using (auth.uid() = user_id);

create policy "Users can insert their own applications" on loan_applications
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own applications" on loan_applications
  for update using (auth.uid() = user_id);

create trigger on_loan_applications_updated
  before update on loan_applications
  for each row execute procedure handle_updated_at();
