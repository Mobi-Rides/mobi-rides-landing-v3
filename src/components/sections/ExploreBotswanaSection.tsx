import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Clock, Users } from 'lucide-react';

const ExploreBotswanaSection = () => {
  const blogPosts = [
    {
      title: "From the Diamond Mines to the Delta: A Weekend Itinerary",
      excerpt: "Discover how mining professionals are maximizing their weekends with curated routes from Jwaneng to the Okavango Delta.",
      readTime: "8 min read",
      category: "Travel Guide",
      image: "/api/placeholder/400/250",
      gradient: "from-primary/80 to-primary"
    },
    {
      title: "Gaborone's Business Lunch Hotspots",
      excerpt: "The ultimate guide to impressing clients and closing deals at Botswana's most prestigious business dining destinations.",
      readTime: "5 min read", 
      category: "Business",
      image: "/api/placeholder/400/250",
      gradient: "from-secondary/80 to-secondary"
    },
    {
      title: "How Agri-preneurs are Using MobiRides to Grow",
      excerpt: "Meet the innovative farmers leveraging flexible mobility solutions to expand their agricultural operations across Botswana.",
      readTime: "6 min read",
      category: "Success Stories",
      image: "/api/placeholder/400/250", 
      gradient: "from-gray-700/80 to-gray-800"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h1 mb-6">
            Explore <span className="gradient-text">Botswana</span> with MobiRides
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Discover insider guides, success stories, and expert tips for making the most of your mobility across Botswana.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="card-elevated overflow-hidden group hover:shadow-strong transition-all duration-300">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div className={`w-full h-full bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                  <MapPin className="w-12 h-12 text-white opacity-80" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                    {post.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center mb-4 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                  <span className="mx-2">•</span>
                  <Users className="w-4 h-4 mr-1" />
                  Featured
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-body text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                <Button 
                  variant="ghost" 
                  className="text-primary hover:text-primary font-semibold p-0 h-auto group/btn"
                >
                  Read Article
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="bg-gradient-hero text-white overflow-hidden">
            <CardContent className="p-8 lg:p-12 text-center relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <h3 className="text-h2 mb-4">Stay Updated with Mobility Insights</h3>
                <p className="text-lg mb-8 text-gray-100 max-w-2xl mx-auto">
                  Get exclusive access to travel guides, business insights, and success stories from Botswana's mobility leaders.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white/95 backdrop-blur-sm placeholder-gray-500 border-0 focus:ring-2 focus:ring-white/50"
                  />
                  <Button className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3">
                    Subscribe
                  </Button>
                </div>
                
                <p className="text-sm text-gray-200 mt-4">
                  Join 5,000+ professionals. Unsubscribe anytime.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExploreBotswanaSection;