import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageLayout, PageHero } from '../components/layouts';
import { 
  Search, 
  ChevronRight, 
  ChevronDown, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  ExternalLink,
  BookOpen,
  Zap,
  Shield,
  CreditCard,
  User,
  Car,
  MapPin,
  Settings
} from 'lucide-react';
import supportData from '../data/support-articles.json';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  popularity: number;
  lastUpdated: string;
  helpful: number;
  notHelpful: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const SupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    BookOpen,
    Zap,
    Shield,
    CreditCard,
    User,
    Car,
    MapPin,
    Settings,
    HelpCircle
  };

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let faqs = supportData.faqs as FAQ[];
    
    if (searchQuery) {
      faqs = faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      faqs = faqs.filter(faq => faq.category === selectedCategory);
    }
    
    return faqs;
  }, [searchQuery, selectedCategory]);

  // Filter articles based on search and category
  const filteredArticles = useMemo(() => {
    let articles = supportData.articles as Article[];
    
    if (searchQuery) {
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'all') {
      articles = articles.filter(article => article.category === selectedCategory);
    }
    
    return articles;
  }, [searchQuery, selectedCategory]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "MobiRides Support Center",
    "description": "Find answers to common questions and get help with MobiRides services. Comprehensive support documentation and troubleshooting guides.",
    "url": "https://www.mobirides.com/support",
    "mainEntity": supportData.faqs.slice(0, 10).map((faq: FAQ) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <PageLayout 
      title="Support Center - MobiRides | Help & FAQs"
      description="Get help with MobiRides. Find answers to frequently asked questions, troubleshooting guides, and comprehensive support documentation for riders and drivers."
      canonical="https://www.mobirides.com/support"
    >
      <Helmet>
        <title>Support Center - MobiRides | Help &amp; FAQs</title>
        <meta 
          name="description" 
          content="Get help with MobiRides. Find answers to frequently asked questions, troubleshooting guides, and comprehensive support documentation for riders and drivers." 
        />
        <meta name="keywords" content="MobiRides support, help center, FAQ, troubleshooting, customer service, rider help, driver support, how to guides" />
        <link rel="canonical" href="https://www.mobirides.com/support" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <PageHero
        title="Support Center"
        subtitle="Find answers to your questions and get the help you need. Search our knowledge base or contact our support team."
        backgroundImage="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20help%20center%20with%20customer%20support%20representatives%20assisting%20users%2C%20bright%20and%20organized%20workspace%2C%20technology%20and%20communication%20theme%2C%20professional%20service%20environment&image_size=landscape_16_9"
      />

      {/* Search and Quick Actions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Search for help articles, FAQs, or guides..."
              />
            </div>
            
            {/* Search Suggestions */}
            {searchQuery === '' && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {supportData.searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(suggestion)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {supportData.quickActions.map((action) => {
              const IconComponent = iconMap[action.icon] || HelpCircle;
              return (
                <div key={action.id} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${action.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {action.description}
                  </p>
                  <div className="flex items-center justify-center text-blue-600 font-medium">
                    <span className="mr-1">{action.action}</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Categories
            </button>
            {supportData.categories.map((category) => {
              const IconComponent = iconMap[category.icon] || HelpCircle;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to the most common questions
            </p>
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFAQ === faq.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No FAQs found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Help Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Help Articles
            </h2>
            <p className="text-lg text-gray-600">
              Detailed guides and tutorials to help you get the most out of MobiRides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {supportData.categories.find(cat => cat.id === article.category)?.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      Updated {new Date(article.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1 transition-colors"
                  >
                    <span>{expandedArticle === article.id ? 'Hide' : 'Read'} Article</span>
                    {expandedArticle === article.id ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {expandedArticle === article.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="prose prose-sm max-w-none text-gray-600">
                        {article.content.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-3">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still Need Help?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/contact"
              className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <MessageCircle className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Contact Form</h3>
              <p className="text-sm opacity-90">Send us a detailed message</p>
            </a>
            
            <a
              href="tel:+267-123-4567"
              className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors"
            >
              <Phone className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm opacity-90">Call us directly</p>
            </a>
            
            <a
              href="mailto:hello@mobirides.com"
              className="bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition-colors"
            >
              <Mail className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm opacity-90">Send us an email</p>
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SupportPage;