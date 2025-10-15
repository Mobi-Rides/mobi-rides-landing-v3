import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase, BlogPost } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Calendar,
  User,
  FileText,
  Download,
  Activity,
} from 'lucide-react';
import { format } from 'date-fns';
import { processScheduledPosts, getUpcomingScheduledPosts } from '@/lib/scheduler';
import { toast } from "sonner";
import { safeDeleteImageFromUrl } from "@/lib/storage";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [diagRunning, setDiagRunning] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
    fetchScheduledPosts();
    
    // Set up interval to check for scheduled posts every minute
    const interval = setInterval(async () => {
      await processScheduledPosts();
      fetchPosts(); // Refresh posts after processing
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchScheduledPosts = async () => {
    try {
      const { posts: scheduled } = await getUpcomingScheduledPosts(5);
      setScheduledPosts(scheduled);
    } catch (err: any) {
      console.error('Failed to fetch scheduled posts:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setDeletingId(id);
    try {
      // Fetch post to get image URLs for cleanup
      const { data: postData, error: fetchErr } = await supabase
        .from('blog_posts')
        .select('featured_image, social_image')
        .eq('id', id)
        .single();

      if (fetchErr) {
        console.warn('Could not fetch post for image cleanup:', fetchErr.message);
      }

      // Delete the post
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Cleanup images (best-effort)
      const urls: string[] = [];
      if (postData?.featured_image) urls.push(postData.featured_image);
      if (postData?.social_image) urls.push(postData.social_image);

      await Promise.all(
        urls.map(async (u) => {
          const res = await safeDeleteImageFromUrl(u);
          if (!res.success) {
            console.warn('Image cleanup failed:', res.error);
          }
        })
      );

      setPosts(posts.filter(post => post.id !== id));
      toast.success('Post deleted');
    } catch (err: any) {
      console.error('Delete post failed:', err);
      setError(err.message || 'Failed to delete post');
      toast.error(err.message || 'Failed to delete post');
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (id: string, status: 'draft' | 'published') => {
    try {
      const updateData: any = { status };
      if (status === 'published') {
        updateData.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      fetchPosts(); // Refresh the list
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleImportPosts = async () => {
    if (!confirm('This will import 4 blog posts with AI-generated content. Continue?')) return;

    setImporting(true);
    try {
      const { data, error } = await supabase.functions.invoke('import-blog-posts');

      if (error) throw error;

      console.log('Import result:', data);
      
      if (data.success) {
        toast.success(`Successfully imported ${data.imported} blog posts!`);
        fetchPosts(); // Refresh the list
      } else {
        toast.error('Import completed with some errors. Check console for details.');
      }
    } catch (err: any) {
      console.error('Import failed:', err);
      const msg = err?.message || 'Failed to import blog posts';
      if (msg.toLowerCase().includes('fetch') || err?.name === 'FunctionsFetchError') {
        toast.error('Edge Functions unreachable. Try "Run diagnostics" to debug.');
      } else {
        toast.error(msg);
      }
      setError(msg);
    } finally {
      setImporting(false);
    }
  };

  const handleDiagnostics = async () => {
    setDiagRunning(true);
    try {
      const { data, error } = await supabase.functions.invoke('ping');
      if (error) {
        console.error('Diagnostics failed:', error);
        toast.error('Diagnostics failed: Edge Functions unreachable.');
      } else if (data?.ok) {
        toast.success('Diagnostics passed: Edge Functions reachable.');
        console.log('Diagnostics result:', data);
      } else {
        toast.error('Diagnostics returned unexpected response.');
        console.warn('Diagnostics unexpected response:', data);
      }
    } catch (err: any) {
      console.error('Diagnostics error:', err);
      toast.error(err.message || 'Diagnostics error');
    } finally {
      setDiagRunning(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'secondary',
      published: 'default',
      scheduled: 'outline',
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <img src="/mobirides-logo.jpg" alt="MobiRides" className="h-8 w-auto" />
                <span className="font-semibold text-gray-900">Admin</span>
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-900">Blog Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.email}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {posts.filter(p => p.status === 'published').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {posts.filter(p => p.status === 'draft').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {posts.filter(p => p.status === 'scheduled').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={handleDiagnostics}
              disabled={diagRunning}
            >
              <Activity className="h-4 w-4 mr-2" />
              {diagRunning ? 'Running...' : 'Run diagnostics'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleImportPosts}
              disabled={importing}
            >
              <Download className="h-4 w-4 mr-2" />
              {importing ? 'Importing...' : 'Import Sample Posts'}
            </Button>
            <Button onClick={() => navigate('/admin/blog/new')}>
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>

        {/* Scheduled Posts Section */}
        {scheduledPosts.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Scheduled Posts
              </CardTitle>
              <CardDescription>
                Posts scheduled to be published automatically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduledPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{post.title}</h4>
                      <p className="text-sm text-gray-600">
                        Scheduled for: {format(new Date(post.scheduled_for), 'MMM dd, yyyy at h:mm a')}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      Scheduled
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>
              Manage your blog content, drafts, and published articles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {post.excerpt}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{post.author_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{post.category}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(post.status)}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {format(new Date(post.created_at), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {post.status === 'draft' && (
                          <Button size="sm" onClick={() => handleStatusChange(post.id, 'published')}>
                            Publish
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                if (post.status === 'published') {
                                  window.open(`/blog/${post.slug}`, '_blank');
                                } else {
                                  window.open(`/admin/blog/preview/${post.id}`, '_blank');
                                }
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            {post.status === 'draft' && (
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(post.id, 'published')}
                              >
                                Publish
                              </DropdownMenuItem>
                            )}
                            {post.status === 'published' && (
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(post.id, 'draft')}
                              >
                                Unpublish
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleDelete(post.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ? 'No posts match your search.' : 'Get started by creating your first blog post.'}
                </p>
                {!searchTerm && (
                  <Button onClick={() => navigate('/admin/blog/new')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Post
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}