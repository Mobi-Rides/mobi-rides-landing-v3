import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageLayout, PageHero, SectionWrapper } from '../components/layouts';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Filter,
  Tag,
  TrendingUp,
  MapPin,
  Car,
  Briefcase
} from 'lucide-react';
import blogData from '../data/blog-posts.json';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  featuredImage: string;
  readTime: number;
  featured: boolean;
}

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const blogPosts: BlogPost[] = blogData;
  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  const filteredAndSortedPosts = useMemo(() => {
    const filtered = blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'popular':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'readTime':
          return a.readTime - b.readTime;
        default:
          return 0;
      }
    });

    return filtered;
  }, [blogPosts, searchTerm, selectedCategory, selectedTag, sortBy]);

  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Travel Guides':
        return <MapPin className="w-4 h-4" />;
      case 'Business Insights':
        return <Briefcase className="w-4 h-4" />;
      case 'Vehicle Reviews':
        return <Car className="w-4 h-4" />;
      case 'Local News':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Tag className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Travel Guides':
        return 'bg-blue-100 text-blue-800';
      case 'Business Insights':
        return 'bg-purple-100 text-purple-800';
      case 'Vehicle Reviews':
        return 'bg-green-100 text-green-800';
      case 'Local News':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Mobirides Blog",
    "description": "Latest insights, travel guides, and news about car rentals and mobility in Botswana",
    "url": "https://mobirides.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Mobirides",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mobirides.com/logo.png"
      }
    },
    "blogPost": featuredPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.featuredImage,
      "datePublished": post.publishedAt,
      "author": {
        "@type": "Person",
        "name": post.author
      }
    }))
  };

  return (
    <PageLayout
      title="Blog - Travel Guides & Insights | Mobirides"
      description="Discover travel guides, vehicle reviews, business insights, and local news about car rentals and mobility in Botswana. Expert tips and advice from Mobirides."
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <PageHero
        title="Mobirides Blog"
        subtitle="Insights & Guides"
        description="Discover travel guides, vehicle reviews, business insights, and the latest news about mobility in Botswana."
        backgroundImage="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20blog%20writing%20workspace%20laptop%20coffee%20Botswana%20landscape%20travel%20journalism&image_size=landscape_16_9"
        variant="centered"
      />

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <SectionWrapper background="white" padding="large">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h2>
            <p className="text-lg text-gray-600">
              Our most popular and insightful content
            </p>
          </div>

          <div className="space-y-6">
            {featuredPosts.map((post, index) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <div className="flex flex-col">
                  <div className="relative w-full">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getCategoryColor(post.category)} flex items-center gap-1`}>
                        {getCategoryIcon(post.category)}
                        {post.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 w-full">
                    <h3 className="font-bold text-xl lg:text-2xl text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-base">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.publishedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime} min read
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full group">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Search and Filter Section */}
      <SectionWrapper background="gray" padding="medium">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Articles
            </h2>
            <p className="text-lg text-gray-600">
              Explore our complete collection of articles and insights
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Tag Filter */}
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="readTime">Quick Reads</option>
              </select>
            </div>

            {/* Active Filters */}
            {(searchTerm || selectedCategory !== 'All' || selectedTag) && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Filter className="w-4 h-4" />
                  Active filters:
                </span>
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: {searchTerm}
                    <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-red-600">
                      ×
                    </button>
                  </Badge>
                )}
                {selectedCategory !== 'All' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory('All')} className="ml-1 hover:text-red-600">
                      ×
                    </button>
                  </Badge>
                )}
                {selectedTag && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Tag: {selectedTag}
                    <button onClick={() => setSelectedTag('')} className="ml-1 hover:text-red-600">
                      ×
                    </button>
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedTag('');
                  }}
                  className="text-xs"
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredAndSortedPosts.length} of {blogPosts.length} articles
            </p>
          </div>

          {/* Articles List */}
          {filteredAndSortedPosts.length > 0 ? (
            <div className="space-y-6">
              {filteredAndSortedPosts.map(post => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex flex-col">
                    <div className="relative w-full">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${getCategoryColor(post.category)} flex items-center gap-1`}>
                          {getCategoryIcon(post.category)}
                          {post.category}
                        </Badge>
                      </div>
                      {post.featured && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-black/70 text-white">
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 w-full">
                      <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {post.author}
                            </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.publishedAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime} min
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full group">
                        Read Article
                        <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedTag('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* Newsletter Subscription */}
      <SectionWrapper background="white" padding="medium">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter and never miss the latest travel guides, 
            vehicle reviews, and mobility insights from Botswana.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1"
            />
            <Button className="sm:w-auto">
              Subscribe
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </SectionWrapper>
    </PageLayout>
  );
};

export default BlogPage;