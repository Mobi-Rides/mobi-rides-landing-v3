import React, { useState, useMemo } from 'react';
import { PageLayout } from '../components/layouts';
import { Search, ChevronDown, ChevronUp, HelpCircle, Car, CreditCard, Shield, Users, Smartphone, Mail, Phone, Clock } from 'lucide-react';
import faqData from '../data/faq.json';

interface Question {
  id: string;
  question: string;
  answer: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  questions: Question[];
}

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [showPopular, setShowPopular] = useState(true);

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      HelpCircle,
      Car,
      CreditCard,
      Shield,
      Users,
      Smartphone
    };
    return icons[iconName] || HelpCircle;
  };

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const filteredQuestions = useMemo(() => {
    let allQuestions: (Question & { categoryName: string })[] = [];
    
    faqData.categories.forEach((category: Category) => {
      category.questions.forEach((question: Question) => {
        allQuestions.push({ ...question, categoryName: category.name });
      });
    });

    // Filter by search term
    if (searchTerm) {
      allQuestions = allQuestions.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      const category = faqData.categories.find((cat: Category) => cat.id === selectedCategory);
      if (category) {
        allQuestions = allQuestions.filter(q => 
          category.questions.some(cq => cq.id === q.id)
        );
      }
    }

    return allQuestions;
  }, [searchTerm, selectedCategory]);

  const popularQuestions = useMemo(() => {
    const popular: (Question & { categoryName: string })[] = [];
    faqData.categories.forEach((category: Category) => {
      category.questions.forEach((question: Question) => {
        if (faqData.popularQuestions.includes(question.id)) {
          popular.push({ ...question, categoryName: category.name });
        }
      });
    });
    return popular;
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.categories.flatMap((category: Category) => 
      category.questions.map((question: Question) => ({
        "@type": "Question",
        "name": question.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": question.answer
        }
      }))
    )
  };

  return (
    <PageLayout
      title="Frequently Asked Questions - MobiRides"
      description="Find answers to common questions about MobiRides ride-sharing service in Botswana. Get help with booking, payments, safety, and more."
      keywords="MobiRides FAQ, help, support, questions, ride sharing, Botswana, booking, payment, safety"
      jsonLd={jsonLd}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              How can we <span className="text-blue-600">help</span> you?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Find quick answers to common questions about MobiRides services, booking, payments, and more.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                />
              </div>
              {searchTerm && (
                <div className="absolute top-full left-0 right-0 mt-2 text-sm text-gray-600">
                  Found {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{faqData.categories.length}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-green-600">
                  {faqData.categories.reduce((total: number, cat: Category) => total + cat.questions.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-orange-600">&lt;2h</div>
                <div className="text-sm text-gray-600">Response</div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="max-w-6xl mx-auto px-4 mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
            >
              <HelpCircle className="w-5 h-5" />
              All Categories
            </button>
            {faqData.categories.map((category: Category) => {
              const IconComponent = getIcon(category.icon);
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* Popular Questions */}
        {showPopular && !searchTerm && selectedCategory === 'all' && (
          <section className="max-w-4xl mx-auto px-4 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Questions</h2>
              <p className="text-lg text-gray-600">Most frequently asked questions by our users</p>
            </div>
            
            <div className="space-y-4">
              {popularQuestions.map((question) => {
                const isExpanded = expandedQuestions.has(question.id);
                return (
                  <div key={question.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => toggleQuestion(question.id)}
                      className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{question.question}</h3>
                        <div className="text-sm text-blue-600">{question.categoryName}</div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="pt-4 text-gray-700 leading-relaxed">{question.answer}</div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {question.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="text-center mt-8">
              <button
                onClick={() => setShowPopular(false)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View All Questions →
              </button>
            </div>
          </section>
        )}

        {/* All Questions */}
        {(!showPopular || searchTerm || selectedCategory !== 'all') && (
          <section className="max-w-4xl mx-auto px-4 mb-16">
            {searchTerm && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Search Results for "{searchTerm}"
                </h2>
                <p className="text-lg text-gray-600">
                  {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} found
                </p>
              </div>
            )}
            
            {selectedCategory !== 'all' && !searchTerm && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {faqData.categories.find((cat: Category) => cat.id === selectedCategory)?.name} Questions
                </h2>
                <p className="text-lg text-gray-600">
                  {faqData.categories.find((cat: Category) => cat.id === selectedCategory)?.description}
                </p>
              </div>
            )}
            
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search terms or browse different categories.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setShowPopular(true);
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All Questions
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuestions.map((question) => {
                  const isExpanded = expandedQuestions.has(question.id);
                  return (
                    <div key={question.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      <button
                        onClick={() => toggleQuestion(question.id)}
                        className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{question.question}</h3>
                          <div className="text-sm text-blue-600">{question.categoryName}</div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="px-6 pb-6 border-t border-gray-100">
                          <div className="pt-4 text-gray-700 leading-relaxed">{question.answer}</div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {question.tags.map((tag, index) => (
                              <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* Contact Support */}
        <section className="max-w-4xl mx-auto px-4 mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-xl mb-8 opacity-90">
              Can't find what you're looking for? Our support team is here to help 24/7.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-6">
                <Mail className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm opacity-90 mb-3">{faqData.contactInfo.supportEmail}</p>
                <p className="text-xs opacity-75">{faqData.contactInfo.responseTime}</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <Phone className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Emergency Hotline</h3>
                <p className="text-sm opacity-90 mb-3">{faqData.contactInfo.emergencyHotline}</p>
                <p className="text-xs opacity-75">For urgent safety issues</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <Clock className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Support Hours</h3>
                <p className="text-sm opacity-90 mb-3">{faqData.contactInfo.businessHours}</p>
                <p className="text-xs opacity-75">Always here when you need us</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${faqData.contactInfo.supportEmail}`}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </a>
              <a
                href={`mailto:${faqData.contactInfo.driverEmail}`}
                className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
              >
                Driver Support
              </a>
            </div>
          </div>
        </section>

        {/* Search Tags */}
        <section className="max-w-6xl mx-auto px-4 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Topics</h2>
            <p className="text-gray-600">Quick access to commonly searched topics</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {faqData.searchTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => setSearchTerm(tag)}
                className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm border border-gray-200"
              >
                #{tag}
              </button>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default FAQPage;