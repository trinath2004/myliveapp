-- MTS Famous Places Finder - feedback database setup
-- Run this ONCE in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run

create table if not exists public.comments (
  id         bigint generated always as identity primary key,
  name       text not null check (char_length(name) between 1 and 40),
  message    text not null check (char_length(message) between 1 and 500),
  owner_hash text not null,                       -- SHA-256 of the author's secret token
  created_at timestamptz not null default now()
);

-- Lock the table: nobody can read or write it directly.
-- Everything goes through the three functions below.
alter table public.comments enable row level security;

-- 1) List comments. "mine" is true only for comments written from this browser.
create or replace function public.list_comments(p_token text)
returns table (id bigint, name text, message text, created_at timestamptz, mine boolean)
language sql stable security definer set search_path = public as $$
  select c.id, c.name, c.message, c.created_at,
         (c.owner_hash = encode(sha256(convert_to(coalesce(p_token, ''), 'UTF8')), 'hex')) as mine
  from public.comments c
  order by c.created_at desc
  limit 200;
$$;

-- 2) Add a comment (anyone can suggest).
create or replace function public.add_comment(p_name text, p_message text, p_token text)
returns void
language plpgsql security definer set search_path = public as $$
begin
  if p_token is null or char_length(p_token) < 16 then
    raise exception 'invalid token';
  end if;
  insert into public.comments (name, message, owner_hash)
  values (left(trim(p_name), 40), left(trim(p_message), 500),
          encode(sha256(convert_to(p_token, 'UTF8')), 'hex'));
end;
$$;

-- 3) Delete a comment - works ONLY if the token matches the author's.
create or replace function public.delete_comment(p_id bigint, p_token text)
returns boolean
language plpgsql security definer set search_path = public as $$
declare removed int;
begin
  delete from public.comments
  where id = p_id
    and owner_hash = encode(sha256(convert_to(coalesce(p_token, ''), 'UTF8')), 'hex');
  get diagnostics removed = row_count;
  return removed > 0;
end;
$$;

grant execute on function public.list_comments(text)           to anon;
grant execute on function public.add_comment(text, text, text) to anon;
grant execute on function public.delete_comment(bigint, text)  to anon;
