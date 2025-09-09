import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Users } from 'lucide-react';
import botswanaSafariImage from '@/assets/botswana-safari.jpg';
import gaboroneBusinessImage from '@/assets/gaborone-business.jpg';
import agriEntrepreneurImage from '@/assets/agri-entrepreneur.jpg';

const ExploreBotswanaSection = () => {
  const blogPosts = [
    {
      title: "From the Diamond Mines to the Delta: A Weekend Itinerary",
      excerpt: "Discover how mining professionals are maximizing their weekends with curated routes from Jwaneng to the Okavango Delta.",
      readTime: "8 min read",
      category: "Travel Guide",
      image: botswanaSafariImage
    },
    {
      title: "Gaborone's Business Lunch Hotspots",
      excerpt: "The ultimate guide to impressing clients and closing deals at Botswana's most prestigious business dining destinations.",
      readTime: "5 min read", 
      category: "Business",
      image: gaboroneBusinessImage
    },
    {
      title: "How Agri-preneurs are Using MobiRides to Grow",
      excerpt: "Meet the innovative farmers leveraging flexible mobility solutions to expand their agricultural operations across Botswana.",
      readTime: "6 min read",
      category: "Success Stories",
      image: agriEntrepreneurImage
    }
  ];

  return (
    <section className="py-20 bg-gradient-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            What's new
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover insider guides, success stories, and expert tips for making the most of your mobility across Botswana.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    #{post.category.replace(' ', '')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>
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