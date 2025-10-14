-- Fix storage policies for blog-images bucket (idempotent)
-- Ensures bucket exists and is public, and policies allow public read and authenticated writes/updates/deletes

-- 1) Create bucket if missing
insert into storage.buckets (id, name, public)
select 'blog-images', 'blog-images', true
where not exists (
  select 1 from storage.buckets where id = 'blog-images'
);

-- 2) Make bucket public if currently private
update storage.buckets
set public = true
where id = 'blog-images' and public is distinct from true;

-- 3) Public read policy (any role can SELECT objects in this bucket)
-- Using DO block for idempotency across environments that don't support "create policy if not exists"
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'blog_images_public_read'
  ) then
    create policy blog_images_public_read on storage.objects
      for select
      using (bucket_id = 'blog-images');
  end if;
end $$;

-- 4) Authenticated INSERT policy
-- Allows logged-in users to upload into blog-images bucket
-- Note: "to authenticated" restricts to the authenticated role
-- The with check clause ensures inserted rows target the correct bucket
--
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'blog_images_authenticated_insert'
  ) then
    create policy blog_images_authenticated_insert on storage.objects
      for insert
      to authenticated
      with check (bucket_id = 'blog-images');
  end if;
end $$;

-- 5) Authenticated UPDATE policy
-- Allows logged-in users to update objects within blog-images bucket
-- Both using and with check limit to the bucket
--
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'blog_images_authenticated_update'
  ) then
    create policy blog_images_authenticated_update on storage.objects
      for update
      to authenticated
      using (bucket_id = 'blog-images')
      with check (bucket_id = 'blog-images');
  end if;
end $$;

-- 6) Authenticated DELETE policy
-- Allows logged-in users to delete objects within blog-images bucket
--
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'blog_images_authenticated_delete'
  ) then
    create policy blog_images_authenticated_delete on storage.objects
      for delete
      to authenticated
      using (bucket_id = 'blog-images');
  end if;
end $$;