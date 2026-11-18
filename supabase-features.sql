-- MTS Heritage Hub: database for the new "Suggest a place / Report a correction", Contact and
-- visitor-analytics features. Run this ONCE in the Supabase SQL editor of your existing project.
-- It does not touch the tables created by supabase-setup.sql.
--
-- Design: the public (anon) key can only call the three functions below. It cannot read or change the
-- tables directly, so visitors can never read other people's suggestions. You review everything in the
-- Supabase dashboard (Table editor -> suggestions / visits).

-- ---------------------------------------------------------------- suggestions & messages
create table if not exists public.suggestions (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  kind        text not null,          -- new_place | correction | other | message
  state       text not null default '',
  district    text not null default '',
  category    text not null default '',
  name        text not null default '',
  details     text not null,
  contact     text not null default '',
  token_hash  text not null,          -- hash of an anonymous device id, used only for rate limiting
  status      text not null default 'new'   -- new | reviewed | done | rejected (edit in the dashboard)
);
alter table public.suggestions enable row level security;   -- no policies: nobody can read or write directly

create or replace function public.add_suggestion(
  p_kind text, p_state text, p_district text, p_category text,
  p_name text, p_details text, p_contact text, p_token text
) returns void
language plpgsql security definer set search_path = public as $$
declare h text := encode(digest(coalesce(p_token, ''), 'sha256'), 'hex');
begin
  if length(trim(coalesce(p_details, ''))) < 3 then raise exception 'details required'; end if;
  if length(p_details) > 1000 or length(coalesce(p_name, '')) > 120 or length(coalesce(p_contact, '')) > 120 then
    raise exception 'too long';
  end if;
  if p_kind not in ('new_place', 'correction', 'other', 'message') then raise exception 'bad kind'; end if;
  -- at most 5 notes per device per hour
  if (select count(*) from public.suggestions where token_hash = h and created_at > now() - interval '1 hour') >= 5 then
    raise exception 'slow down';
  end if;
  insert into public.suggestions (kind, state, district, category, name, details, contact, token_hash)
  values (p_kind, left(coalesce(p_state, ''), 40), left(coalesce(p_district, ''), 60), left(coalesce(p_category, ''), 40),
          trim(coalesce(p_name, '')), trim(p_details), trim(coalesce(p_contact, '')), h);
end $$;

-- ---------------------------------------------------------------- visitor analytics
create table if not exists public.visits (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  day         date not null default (now() at time zone 'utc')::date,
  path        text not null,
  visitor     text not null,          -- hash of a random per-device id (no personal data)
  lang        text not null default 'en'
);
create index if not exists visits_day_idx on public.visits (day);
alter table public.visits enable row level security;

create or replace function public.track_visit(p_path text, p_visitor text, p_lang text)
returns void
language plpgsql security definer set search_path = public as $$
begin
  if p_path is null or left(p_path, 1) <> '/' or length(p_path) > 120 then return; end if;
  insert into public.visits (path, visitor, lang)
  values (p_path, encode(digest(coalesce(p_visitor, ''), 'sha256'), 'hex'), case when p_lang = 'te' then 'te' else 'en' end);
end $$;

-- Totals only (never individual rows). Safe to expose to the public stats page.
create or replace function public.visit_stats(p_days int default 30)
returns json
language sql security definer set search_path = public stable as $$
  with v as (
    select * from public.visits where day >= (now() at time zone 'utc')::date - greatest(1, least(coalesce(p_days, 30), 365))
  )
  select json_build_object(
    'totals', (select json_build_object('views', count(*), 'visitors', count(distinct visitor)) from v),
    'days',   coalesce((select json_agg(x order by x.day desc) from (select day, count(*) as views, count(distinct visitor) as visitors from v group by day) x), '[]'::json),
    'pages',  coalesce((select json_agg(y) from (select path, count(*) as views from v group by path order by count(*) desc limit 15) y), '[]'::json)
  );
$$;

-- ---------------------------------------------------------------- permissions
create extension if not exists pgcrypto with schema extensions;
-- digest() lives in the "extensions" schema on Supabase; make the functions find it.
alter function public.add_suggestion(text, text, text, text, text, text, text, text) set search_path = public, extensions;
alter function public.track_visit(text, text, text) set search_path = public, extensions;

revoke all on function public.add_suggestion(text, text, text, text, text, text, text, text) from public;
revoke all on function public.track_visit(text, text, text) from public;
revoke all on function public.visit_stats(int) from public;
grant execute on function public.add_suggestion(text, text, text, text, text, text, text, text) to anon, authenticated;
grant execute on function public.track_visit(text, text, text) to anon, authenticated;
grant execute on function public.visit_stats(int) to anon, authenticated;
