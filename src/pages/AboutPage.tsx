import React from 'react';
import { PageLayout, PageHero, SectionWrapper } from '../components/layouts';
import { buildCanonicalUrl } from '@/config/site';
import TeamGrid from '../components/TeamGrid';
import FAQSection from '../components/FAQSection';
import ContactForm from '../components/ContactForm';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Users, Target, Award, Globe, Heart, Shield } from 'lucide-react';
import teamMembersData from '../data/team-members.json';
import faqData from '../data/faq-data.json';
const AboutPage: React.FC = () => {
  const companyValues = [{
    icon: Shield,
    title: 'Safety First',
    description: 'Every rental is backed by comprehensive damage protection and rigorous safety protocols to ensure peace of mind for all users.'
  }, {
    icon: Users,
    title: 'Community Driven',
    description: 'We believe in building strong communities by connecting neighbors and creating meaningful relationships through shared mobility.'
  }, {
    icon: Globe,
    title: 'Sustainable Future',
    description: 'Reducing carbon footprint through shared transportation while making mobility more accessible and affordable for everyone.'
  }, {
    icon: Heart,
    title: 'Trust & Transparency',
    description: 'Building trust through transparent pricing, clear policies, and honest communication with our community members.'
  }];
  const companyStats = [{
    label: 'Active Users',
    value: '154+',
    icon: Users
  }, {
    label: 'Cities Served',
    value: '4+',
    icon: Globe
  }, {
    label: 'Rentals Completed',
    value: '200+',
    icon: Target
  }, {
    label: 'Safety Rating',
    value: '4.9/5',
    icon: Award
  }];
  const aboutFAQs = faqData.general.slice(0, 6);
  const handleContactSubmit = (data: {
    name: string;
    email: string;
    message: string;
    subject?: string;
  }) => {
    console.log('Contact form submitted:', data);
    // Handle form submission here
  };
  return <PageLayout title="About MobiRides - Connecting Communities Through Shared Mobility" description="Learn about MobiRides' mission to revolutionize transportation through community-driven car sharing. Discover our story, values, and the team behind the platform." canonical={buildCanonicalUrl('/about')}>
      <PageHero title="Revolutionizing Transportation" subtitle="Through Community Connection" description="MobiRides is more than just a car sharing platform. We're building a community-driven ecosystem that makes transportation accessible, affordable, and sustainable for everyone." variant="default" ctaText="Join Our Community" ctaLink="/signup" />

      {/* Company Story Section */}
      <SectionWrapper className="py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Story
          </h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">Founded in January 2025, MobiRides emerged from a simple observation: millions of cars sit idle while people struggle with transportation access. We envisioned a world where communities could share resources, reduce environmental impact, and build stronger connections.</p>
            <p className="mb-6">
              What started as a local initiative has grown into a trusted platform serving over 154+ users across 4+ cities in Botswana. Our success stems from putting community first – every feature, policy, and decision is made with our users' safety, convenience, and trust in mind.
            </p>
            <p>
              Today, we're proud to be Botswana's premier community-driven car sharing platform, facilitating over 200+ safe rentals while reducing carbon emissions and making transportation more accessible for everyone.
            </p>
          </div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {companyStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>;
        })}
        </div>
      </SectionWrapper>

      {/* Company Values Section */}
      <SectionWrapper className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do, from product development to community engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {companyValues.map((value, index) => {
            const IconComponent = value.icon;
            return <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
      </SectionWrapper>

      {/* Team Section */}
      <SectionWrapper className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Passionate individuals from diverse backgrounds united by a common mission to transform transportation.
            </p>
          </div>

          <TeamGrid members={teamMembersData} showDepartmentFilter={true} maxMembers={8} />
        </div>
      </SectionWrapper>

      {/* Mission & Vision Section */}
      <SectionWrapper className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Mission &amp; Vision
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="mb-6">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-4">
                  Our Mission
                </Badge>
              </div>
              <p className="text-lg leading-relaxed">
                To democratize mobility in Botswana by connecting car owners with renters through a secure, transparent platform while creating pathways to vehicle ownership through our innovative Rent2Buy marketplace.
              </p>
            </div>
            
            <div>
              <div className="mb-6">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-4">
                  Our Vision
                </Badge>
              </div>
              <p className="text-lg leading-relaxed">
                To launch Southern Africa's first Peer2Peer hub for Vehicle Rentals and Financing, connecting owners, renters, insurers, and financiers on one marketplace platform, and build the rails for electric vehicle adoption on the continent.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about MobiRides and our services.
            </p>
          </div>

          <FAQSection items={aboutFAQs} searchable={false} categories={[]} title="" />
        </div>
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600">
              Have questions or want to learn more? We'd love to hear from you.
            </p>
          </div>

          <ContactForm type="general" onSubmit={handleContactSubmit} />
        </div>
      </SectionWrapper>
    </PageLayout>;
};
export default AboutPage;