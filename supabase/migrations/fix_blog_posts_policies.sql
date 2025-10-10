-- Migration: Fix blog_posts RLS policies to allow draft saving
-- Idempotent: Only creates policies if they do not already exist

-- Ensure RLS enabled
ALTER TABLE IF EXISTS public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 1) Public can select published posts (keep existing behavior)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'blog_posts' AND policyname = 'blog_posts_published_select'
  ) THEN
    CREATE POLICY blog_posts_published_select
      ON public.blog_posts
      FOR SELECT
      TO public
      USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());
  END IF;
END $$;

-- 2) Authors (authenticated) can select their own posts (including drafts)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'blog_posts' AND policyname = 'blog_posts_author_select_own'
  ) THEN
    CREATE POLICY blog_posts_author_select_own
      ON public.blog_posts
      FOR SELECT
      TO authenticated
      USING (author_email = auth.jwt() ->> 'email');
  END IF;
END $$;

-- 3) Authors (authenticated) can INSERT their own posts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'blog_posts' AND policyname = 'blog_posts_authenticated_insert_own'
  ) THEN
    CREATE POLICY blog_posts_authenticated_insert_own
      ON public.blog_posts
      FOR INSERT
      TO authenticated
      WITH CHECK (author_email = auth.jwt() ->> 'email');
  END IF;
END $$;

-- 4) Authors (authenticated) can UPDATE their own posts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'blog_posts' AND policyname = 'blog_posts_authenticated_update_own'
  ) THEN
    CREATE POLICY blog_posts_authenticated_update_own
      ON public.blog_posts
      FOR UPDATE
      TO authenticated
      USING (author_email = auth.jwt() ->> 'email')
      WITH CHECK (author_email = auth.jwt() ->> 'email');
  END IF;
END $$;

-- 5) Authors (authenticated) can DELETE their own posts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'blog_posts' AND policyname = 'blog_posts_authenticated_delete_own'
  ) THEN
    CREATE POLICY blog_posts_authenticated_delete_own
      ON public.blog_posts
      FOR DELETE
      TO authenticated
      USING (author_email = auth.jwt() ->> 'email');
  END IF;
END $$;

-- 6) Admins (authenticated with mobirides.com domain or role=admin) can manage all posts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'blog_posts' AND policyname = 'blog_posts_admin_all'
  ) THEN
    CREATE POLICY blog_posts_admin_all
      ON public.blog_posts
      FOR ALL
      TO authenticated
      USING (
        (auth.jwt() ->> 'email') LIKE '%@mobirides.com' OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
      )
      WITH CHECK (
        (auth.jwt() ->> 'email') LIKE '%@mobirides.com' OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
      );
  END IF;
END $$;