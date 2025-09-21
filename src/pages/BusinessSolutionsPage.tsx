import React, { useState } from 'react';
import { PageLayout } from '../components/layouts';
import { Building2, Users, BarChart3, Shield, Clock, Zap, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';

interface BusinessFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  logo: string;
}

const BusinessSolutionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pricing' | 'case-studies'>('overview');
  const [selectedPlan, setSelectedPlan] = useState<string>('enterprise');

  const businessFeatures: BusinessFeature[] = [
    {
      id: '1',
      title: 'Fleet Management',
      description: 'Comprehensive fleet management tools for businesses of all sizes',
      icon: <Building2 className="w-8 h-8" />,
      benefits: [
        'Real-time vehicle tracking',
        'Driver performance analytics',
        'Maintenance scheduling',
        'Route optimization',
        'Fuel cost management'
      ]
    },
    {
      id: '2',
      title: 'Employee Transportation',
      description: 'Safe and reliable transportation solutions for your workforce',
      icon: <Users className="w-8 h-8" />,
      benefits: [
        'Corporate ride programs',
        'Expense management',
        'Safety protocols',
        'Flexible scheduling',
        'Cost center allocation'
      ]
    },
    {
      id: '3',
      title: 'Business Analytics',
      description: 'Data-driven insights to optimize your transportation operations',
      icon: <BarChart3 className="w-8 h-8" />,
      benefits: [
        'Usage analytics dashboard',
        'Cost optimization reports',
        'Performance metrics',
        'Custom reporting',
        'ROI tracking'
      ]
    },
    {
      id: '4',
      title: 'Enterprise Security',
      description: 'Advanced security features for corporate transportation',
      icon: <Shield className="w-8 h-8" />,
      benefits: [
        'Background-checked drivers',
        'Real-time monitoring',
        'Emergency response',
        'Compliance reporting',
        'Data encryption'
      ]
    }
  ];

  const pricingPlans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Business Starter',
      description: 'Perfect for small businesses and startups',
      price: '$299',
      period: 'per month',
      features: [
        'Up to 50 employees',
        'Basic analytics dashboard',
        'Email support',
        'Standard safety features',
        'Monthly reporting'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing companies',
      price: '$599',
      period: 'per month',
      features: [
        'Up to 200 employees',
        'Advanced analytics',
        'Priority support',
        'Custom integrations',
        'Weekly reporting',
        'Dedicated account manager'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Comprehensive solution for large organizations',
      price: 'Custom',
      period: 'pricing',
      features: [
        'Unlimited employees',
        'Full analytics suite',
        '24/7 premium support',
        'API access',
        'Real-time reporting',
        'White-label options',
        'Custom development'
      ]
    }
  ];

  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      company: 'TechCorp Solutions',
      industry: 'Technology',
      challenge: 'Managing transportation for 500+ employees across multiple locations',
      solution: 'Implemented MobiRides Enterprise with fleet management and employee transportation',
      results: [
        '40% reduction in transportation costs',
        '95% employee satisfaction rate',
        '60% improvement in on-time arrivals'
      ],
      logo: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20tech%20company%20logo%20minimalist%20design&image_size=square'
    },
    {
      id: '2',
      company: 'Global Manufacturing Inc.',
      industry: 'Manufacturing',
      challenge: 'Ensuring safe transportation for shift workers in industrial areas',
      solution: 'Deployed comprehensive safety protocols and real-time monitoring system',
      results: [
        '100% safety compliance',
        '30% reduction in late arrivals',
        '25% cost savings on transportation'
      ],
      logo: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=industrial%20manufacturing%20company%20logo%20professional&image_size=square'
    },
    {
      id: '3',
      company: 'HealthCare Partners',
      industry: 'Healthcare',
      challenge: 'Providing reliable transportation for medical staff during emergencies',
      solution: 'Implemented 24/7 emergency response system with priority booking',
      results: [
        '99.9% availability during emergencies',
        '50% faster response times',
        'Improved staff retention'
      ],
      logo: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=healthcare%20medical%20company%20logo%20professional%20clean&image_size=square'
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Business Solutions - MobiRides",
    "description": "Enterprise transportation solutions for businesses. Fleet management, employee transportation, and business analytics.",
    "url": "https://mobirides.com/business-solutions",
    "mainEntity": {
      "@type": "Service",
      "name": "MobiRides Business Solutions",
      "description": "Comprehensive transportation solutions for businesses of all sizes",
      "provider": {
        "@type": "Organization",
        "name": "MobiRides"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageLayout
        title="Business Solutions | MobiRides"
        description="Enterprise transportation solutions for businesses. Fleet management, employee transportation, and business analytics."
        keywords="business transportation, fleet management, employee rides, corporate solutions, enterprise mobility"
      >
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-600 p-4 rounded-full">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Business Solutions
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Transform your business transportation with our comprehensive enterprise solutions. 
                From fleet management to employee rides, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
                <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8" aria-label="Tabs">
              {[
                { id: 'overview', label: 'Overview', icon: Building2 },
                { id: 'features', label: 'Features', icon: Zap },
                { id: 'pricing', label: 'Pricing', icon: BarChart3 },
                { id: 'case-studies', label: 'Case Studies', icon: CheckCircle }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as 'overview' | 'features' | 'pricing' | 'case-studies')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'overview' && (
              <div className="space-y-16">
                {/* Key Benefits */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Why Choose MobiRides for Business?
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                    Our enterprise solutions are designed to meet the unique transportation needs of modern businesses.
                  </p>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      {
                        icon: <Clock className="w-8 h-8" />,
                        title: 'Save Time',
                        description: 'Streamline transportation management with automated systems'
                      },
                      {
                        icon: <BarChart3 className="w-8 h-8" />,
                        title: 'Reduce Costs',
                        description: 'Optimize routes and reduce transportation expenses by up to 40%'
                      },
                      {
                        icon: <Shield className="w-8 h-8" />,
                        title: 'Ensure Safety',
                        description: 'Advanced safety protocols and real-time monitoring'
                      },
                      {
                        icon: <Users className="w-8 h-8" />,
                        title: 'Improve Satisfaction',
                        description: 'Enhance employee experience with reliable transportation'
                      }
                    ].map((benefit, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                          <div className="text-blue-600">{benefit.icon}</div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How It Works */}
                <div className="bg-gray-50 rounded-2xl p-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      How It Works
                    </h2>
                    <p className="text-lg text-gray-600">
                      Get started with MobiRides Business Solutions in three simple steps.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        step: '1',
                        title: 'Consultation & Setup',
                        description: 'Our team works with you to understand your needs and configure the perfect solution.'
                      },
                      {
                        step: '2',
                        title: 'Integration & Training',
                        description: 'Seamless integration with your existing systems and comprehensive team training.'
                      },
                      {
                        step: '3',
                        title: 'Launch & Support',
                        description: 'Go live with dedicated support and ongoing optimization to ensure success.'
                      }
                    ].map((step, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                          {step.step}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Comprehensive Business Features
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Everything you need to manage your business transportation efficiently and effectively.
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {businessFeatures.map((feature) => (
                    <div key={feature.id} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                          <div className="text-blue-600">{feature.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-gray-600 mb-4">{feature.description}</p>
                          <ul className="space-y-2">
                            {feature.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Choose Your Business Plan
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Flexible pricing options designed to scale with your business needs.
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-8">
                  {pricingPlans.map((plan) => (
                    <div key={plan.id} className={`bg-white rounded-xl shadow-lg border-2 p-8 relative ${
                      plan.popular ? 'border-blue-500' : 'border-gray-100'
                    }`}>
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                        <p className="text-gray-600 mb-4">{plan.description}</p>
                        <div className="mb-4">
                          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                          <span className="text-gray-600 ml-2">{plan.period}</span>
                        </div>
                      </div>
                      
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        plan.popular
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                      }`}>
                        {plan.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'case-studies' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Success Stories
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    See how businesses like yours have transformed their transportation with MobiRides.
                  </p>
                </div>
                
                <div className="space-y-8">
                  {caseStudies.map((study) => (
                    <div key={study.id} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                      <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                          <div className="flex items-center mb-4">
                            <img 
                              src={study.logo} 
                              alt={`${study.company} logo`}
                              className="w-16 h-16 rounded-lg mr-4 object-cover"
                            />
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{study.company}</h3>
                              <p className="text-gray-600">{study.industry}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:col-span-2 space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                            <p className="text-gray-600">{study.challenge}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                            <p className="text-gray-600">{study.solution}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Results</h4>
                            <ul className="space-y-1">
                              {study.results.map((result, index) => (
                                <li key={index} className="flex items-center text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Transform Your Business Transportation?
                </h2>
                <p className="text-xl text-blue-100 mb-6">
                  Get in touch with our enterprise team to discuss your specific needs and see how MobiRides can help your business.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-blue-100">
                    <Phone className="w-5 h-5 mr-3" />
                    <span>+267 74300747</span>
                  </div>
                  <div className="flex items-center text-blue-100">
                    <Mail className="w-5 h-5 mr-3" />
                    <span>partnerships@mobirides.com</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Request a Demo
                </h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Work Email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Company Size</option>
                    <option>1-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-1000 employees</option>
                    <option>1000+ employees</option>
                  </select>
                  <textarea
                    placeholder="Tell us about your transportation needs"
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Request Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default BusinessSolutionsPage;