import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User, Eye } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { format } from "date-fns";
import { BlogPost } from "@/lib/supabase";
import localPosts from "@/data/blog-posts.json";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      if (!slug) throw new Error("No slug provided");
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", slug)
          .eq("status", "published")
          .single();

        if (error || !data) {
          // Fallback to local JSON by slug
          const fallback = (localPosts as any[]).find(p => p.slug === slug);
          if (!fallback) throw error || new Error("Post not found");
          // Map local shape to BlogPost
          const mapped: BlogPost = {
            id: fallback.id || fallback.slug,
            title: fallback.title,
            slug: fallback.slug,
            excerpt: fallback.excerpt,
            content: fallback.content,
            featured_image: fallback.featuredImage,
            author_name: fallback.author,
            author_email: "",
            author_bio: null,
            author_image: null,
            category: fallback.category,
            tags: fallback.tags || [],
            meta_description: fallback.excerpt || null,
            status: "published",
            published_at: fallback.publishedAt,
            scheduled_for: null,
            created_at: fallback.publishedAt,
            updated_at: fallback.publishedAt,
            read_time: fallback.readTime || 0,
            view_count: 0,
            social_image: null,
          } as BlogPost;
          return mapped;
        }

        // Increment view count for DB post
        await supabase
          .from("blog_posts")
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq("id", data.id);

        return data as BlogPost;
      } catch (e) {
        const fallback = (localPosts as any[]).find(p => p.slug === slug);
        if (!fallback) throw e;
        const mapped: BlogPost = {
          id: fallback.id || fallback.slug,
          title: fallback.title,
          slug: fallback.slug,
          excerpt: fallback.excerpt,
          content: fallback.content,
          featured_image: fallback.featuredImage,
          author_name: fallback.author,
          author_email: "",
          author_bio: null,
          author_image: null,
          category: fallback.category,
          tags: fallback.tags || [],
          meta_description: fallback.excerpt || null,
          status: "published",
          published_at: fallback.publishedAt,
          scheduled_for: null,
          created_at: fallback.publishedAt,
          updated_at: fallback.publishedAt,
          read_time: fallback.readTime || 0,
          view_count: 0,
          social_image: null,
        } as BlogPost;
        return mapped;
      }
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/blog")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | MobiRides Blog</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt} />
        <meta property="og:image" content={post.featured_image || ""} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.meta_description || post.excerpt} />
        <meta name="twitter:image" content={post.featured_image || ""} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/blog")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Featured Image */}
            {post.featured_image && (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8">
              {/* Category */}
              {post.category && (
                <Badge variant="secondary" className="mb-4">
                  {post.category}
                </Badge>
              )}

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(post.published_at || post.created_at), "MMMM d, yyyy")}</span>
                </div>
                {post.read_time && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.read_time} min read</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{post.view_count || 0} views</span>
                </div>
              </div>

              {/* Content */}
              {post.content?.includes('<') ? (
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  {post.content?.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-start gap-4">
                  {post.author_image && (
                    <img
                      src={post.author_image}
                      alt={post.author_name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {post.author_name}
                    </h3>
                    {post.author_bio && (
                      <p className="text-gray-600 mt-1">{post.author_bio}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogPostPage;