import React from 'react';
import { PageLayout, PageHero, SectionWrapper } from '../components/layouts';
import JobListing from '../components/JobListing';
import TeamGrid from '../components/TeamGrid';
import ContactForm from '../components/ContactForm';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Users, 
  Heart, 
  Zap, 
  Globe, 
  Coffee, 
  Laptop, 
  Calendar, 
  DollarSign,
  MapPin,
  Clock,
  Award,
  Target
} from 'lucide-react';
import jobListingsData from '../data/job-listings.json';
import teamMembersData from '../data/team-members.json';

const CareersPage: React.FC = () => {
  const companyBenefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, dental, vision, and wellness programs.',
      details: ['Medical, dental & vision insurance', 'Mental health support', 'Gym membership reimbursement', 'Wellness stipend']
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Flexible schedules and unlimited PTO to help you maintain balance.',
      details: ['Flexible working hours', 'Unlimited PTO policy', 'Remote work options', 'Sabbatical opportunities']
    },
    {
      icon: Laptop,
      title: 'Professional Growth',
      description: 'Continuous learning opportunities and career development support.',
      details: ['Learning & development budget', 'Conference attendance', 'Mentorship programs', 'Internal mobility']
    },
    {
      icon: Coffee,
      title: 'Office Perks',
      description: 'Modern workspace with all the amenities you need to do your best work.',
      details: ['Free meals & snacks', 'Modern office spaces', 'Game rooms & relaxation areas', 'Commuter benefits']
    },
    {
      icon: DollarSign,
      title: 'Financial Benefits',
      description: 'Competitive compensation and equity participation in our success.',
      details: ['Competitive salaries', 'Equity participation', '401(k) matching', 'Performance bonuses']
    },
    {
      icon: Users,
      title: 'Team Culture',
      description: 'Join a diverse, inclusive team that values collaboration and innovation.',
      details: ['Diverse & inclusive culture', 'Team building events', 'Open communication', 'Innovation time']
    }
  ];

  const companyValues = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We\'re passionate about transforming transportation and building sustainable communities.'
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We embrace new ideas, experiment boldly, and learn from every experience.'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'We put our users and community at the center of everything we do.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'We\'re building solutions that create positive change on a global scale.'
    }
  ];

  const workingStats = [
    { label: 'Team Members', value: '150+', icon: Users },
    { label: 'Countries', value: '12', icon: Globe },
    { label: 'Avg. Tenure', value: '3.2 yrs', icon: Calendar },
    { label: 'Employee NPS', value: '85', icon: Award }
  ];

  const officeLocations = [
    {
      city: 'San Francisco',
      country: 'USA',
      address: '123 Market Street, San Francisco, CA 94105',
      employees: 85,
      isHQ: true
    },
    {
      city: 'New York',
      country: 'USA', 
      address: '456 Broadway, New York, NY 10013',
      employees: 45,
      isHQ: false
    },
    {
      city: 'London',
      country: 'UK',
      address: '789 Oxford Street, London W1C 1JN',
      employees: 20,
      isHQ: false
    }
  ];

  // Get leadership team members for display
  const leadershipTeam = teamMembersData.filter(member => member.isLeadership).slice(0, 4);

  return (
    <PageLayout
      title="Careers at MobiRides - Join Our Mission to Transform Transportation"
      description="Explore career opportunities at MobiRides. Join our team of passionate individuals working to revolutionize transportation through community-driven car sharing."
      keywords="MobiRides careers, jobs, employment, transportation jobs, car sharing careers, tech jobs"
      canonicalUrl="/careers"
    >
      <PageHero
        title="Build the Future of Transportation"
        subtitle="Join Our Mission"
        description="We're looking for passionate individuals who want to make a real impact. Help us create a more sustainable, accessible, and connected world through innovative transportation solutions."
        variant="gradient"
        ctaText="View Open Positions"
        ctaLink="#jobs"
      />

      {/* Company Stats */}
      <SectionWrapper className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Join Our Growing Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're a diverse team of innovators, problem-solvers, and changemakers from around the world.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {workingStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* Company Values */}
      <SectionWrapper className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide how we work, make decisions, and treat each other every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* Benefits & Perks */}
      <SectionWrapper className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Benefits &amp; Perks
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe in taking care of our team with comprehensive benefits and meaningful perks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg text-gray-900">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-gray-600 mb-4 text-sm">{benefit.description}</p>
                    <ul className="space-y-1">
                      {benefit.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-xs text-gray-500 flex items-center">
                          <div className="w-1 h-1 bg-blue-600 rounded-full mr-2"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* Office Locations */}
      <SectionWrapper className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Locations
            </h2>
            <p className="text-lg text-gray-600">
              We have offices around the world, plus remote opportunities for many roles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {officeLocations.map((location, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {location.city}
                      </h3>
                      <p className="text-gray-600">{location.country}</p>
                    </div>
                    {location.isHQ && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        HQ
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-start space-x-2 mb-4">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{location.address}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-600">{location.employees} employees</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Leadership Team */}
      <SectionWrapper className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-gray-600">
              Experienced leaders who are passionate about our mission and committed to our team's success.
            </p>
          </div>

          <TeamGrid 
            members={leadershipTeam}
            showDepartmentFilter={false}
            showStats={false}
            initialLimit={4}
          />
        </div>
      </SectionWrapper>

      {/* Job Listings */}
      <SectionWrapper className="py-16 bg-gray-50" id="jobs">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Open Positions
            </h2>
            <p className="text-lg text-gray-600">
              Find your next opportunity and help us build the future of transportation.
            </p>
          </div>

          <JobListing 
            jobs={jobListingsData}
            showFilters={true}
            showStats={true}
            initialLimit={6}
          />
        </div>
      </SectionWrapper>

      {/* Application Process */}
      <SectionWrapper className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Hiring Process
            </h2>
            <p className="text-lg text-gray-600">
              We've designed our process to be transparent, efficient, and focused on finding the right fit.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Application</h3>
              <p className="text-sm text-gray-600">Submit your application and we'll review it within 48 hours.</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone Screen</h3>
              <p className="text-sm text-gray-600">Brief conversation with our recruiting team to learn more about you.</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <span className="text-xl font-bold text-blue-600">3</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Interviews</h3>
              <p className="text-sm text-gray-600">Meet with team members and discuss your experience and interests.</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <span className="text-xl font-bold text-blue-600">4</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Decision</h3>
              <p className="text-sm text-gray-600">We'll make a decision quickly and provide feedback either way.</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Contact HR */}
      <SectionWrapper className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don't See the Right Role?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            We're always looking for talented people. Send us your resume and tell us how you'd like to contribute to our mission.
          </p>
          <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Send Us Your Resume
          </Button>
        </div>
      </SectionWrapper>

      {/* Contact Form */}
      <SectionWrapper className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Questions About Working Here?
            </h2>
            <p className="text-lg text-gray-600">
              Our HR team is happy to answer any questions about careers at MobiRides.
            </p>
          </div>

          <ContactForm type="business" />
        </div>
      </SectionWrapper>
    </PageLayout>
  );
};

export default CareersPage;