import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { BlogContentRenderer } from "@/components/BlogContentRenderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User, Eye } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { format } from "date-fns";
import type { BlogPost } from "@/lib/supabase";

/**
 * Admin-only preview page for blog posts (including drafts and scheduled).
 * Fetches by ID without status filter and renders using the public BlogPostPage
 * structure, but clearly indicates preview mode and avoids public view count.
 */
const AdminBlogPreviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["admin-blog-preview", id],
    queryFn: async () => {
      if (!id) throw new Error("No post ID provided");

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as BlogPost;
    },
    enabled: !!id,
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Preview Not Available</h1>
          <p className="text-gray-600 mb-6">Could not load the blog post for preview.</p>
          <Button onClick={() => navigate("/admin/blog")}> 
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>
        </div>
      </div>
    );
  }

  const displayDate = post.published_at || post.created_at;

  return (
    <>
      <Helmet>
        <title>Preview: {post.title} | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate("/admin/blog")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Button>
              <span className="text-sm text-gray-500">Draft Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="uppercase">{post.status}</Badge>
              <Link to={`/admin/blog/edit/${post.id}`}>
                <Button variant="secondary" size="sm">Edit</Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`/blog/${post.slug}`, "_blank")}
                disabled={post.status !== "published"}
                title={post.status !== "published" ? "Publish to enable public view" : "Open public page"}
              >
                <Eye className="w-4 h-4 mr-2" />
                Public Page
              </Button>
            </div>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  <span>{format(new Date(displayDate), "MMMM d, yyyy")}</span>
                </div>
                {post.read_time && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.read_time} min read</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <BlogContentRenderer content={post.content} />

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

export default AdminBlogPreviewPage;