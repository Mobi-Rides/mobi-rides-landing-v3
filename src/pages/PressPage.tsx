import React, { useState } from 'react';
import { PageLayout, PageHero, SectionWrapper } from '../components/layouts';
import DocumentDownload from '../components/DocumentDownload';
import ContactForm from '../components/ContactForm';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { 
  Calendar, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Download, 
  ExternalLink,
  Search,
  Filter,
  Image as ImageIcon,
  FileText,
  Video,
  Mic
} from 'lucide-react';
import pressReleasesData from '../data/press-releases.json';

const PressPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mediaContacts = [
    {
      name: 'Sarah Johnson',
      title: 'Head of Communications',
      email: 'press@mobirides.com',
      phone: '+267 74300750',
      specialties: ['Company News', 'Product Launches', 'Partnerships']
    },
    {
      name: 'Michael Chen',
      title: 'PR Manager',
      email: 'media@mobirides.com', 
      phone: '+267 74300750',
      specialties: ['Industry Analysis', 'Executive Interviews', 'Market Trends']
    },
    {
      name: 'Emily Rodriguez',
      title: 'Communications Specialist',
      email: 'news@mobirides.com',
      phone: '+267 74300750',
      specialties: ['Community Stories', 'Safety Updates', 'Local News']
    }
  ];

  const mediaKit = [
    {
      id: 'brand-guidelines',
      title: 'Brand Guidelines',
      description: 'Complete brand guidelines including logos, colors, and usage rules',
      type: 'pdf' as const,
      size: '5.2 MB',
      category: 'brand',
      downloadUrl: '/media-kit/brand-guidelines.pdf',
      lastUpdated: '2024-01-15',
      publishedDate: '2024-01-15',
      tags: ['brand', 'guidelines']
    },
    {
      id: 'logo-pack',
      title: 'Logo Pack',
      description: 'High-resolution logos in various formats (PNG, SVG, EPS)',
      type: 'zip' as const,
      size: '12.8 MB',
      category: 'brand',
      downloadUrl: '/media-kit/logo-pack.zip',
      lastUpdated: '2024-01-10',
      publishedDate: '2024-01-01',
      tags: ['logo', 'brand', 'assets']
    },
    {
      id: 'product-screenshots',
      title: 'Product Screenshots',
      description: 'High-quality screenshots of our mobile app and web platform',
      type: 'zip' as const,
      size: '45.6 MB',
      category: 'product',
      downloadUrl: '/media-kit/product-screenshots.zip',
      lastUpdated: '2024-01-20',
      publishedDate: '2024-01-01',
      tags: ['screenshots', 'product', 'mobile']
    },
    {
      id: 'executive-photos',
      title: 'Executive Photos',
      description: 'Professional headshots of our leadership team',
      type: 'zip' as const,
      size: '28.3 MB',
      category: 'team',
      downloadUrl: '/media-kit/executive-photos.zip',
      lastUpdated: '2024-01-12',
      publishedDate: '2024-01-12',
      tags: ['photos', 'team', 'executives']
    },
    {
      id: 'company-fact-sheet',
      title: 'Company Fact Sheet',
      description: 'Key facts, figures, and milestones about MobiRides',
      type: 'pdf' as const,
      size: '1.2 MB',
      category: 'company',
      downloadUrl: '/media-kit/fact-sheet.pdf',
      lastUpdated: '2024-01-18',
      publishedDate: '2024-01-18',
      tags: ['company', 'facts', 'information']
    },
    {
      id: 'video-assets',
      title: 'Video Assets',
      description: 'Promotional videos, product demos, and b-roll footage',
      type: 'zip' as const,
      size: '156.7 MB',
      category: 'video',
      downloadUrl: '/media-kit/video-assets.zip',
      lastUpdated: '2024-01-08',
      publishedDate: '2024-01-08',
      tags: ['video', 'promotional', 'demo']
    }
  ];

  const pressStats = [
    { label: 'Press Releases', value: '45+', description: 'Published this year' },
    { label: 'Media Mentions', value: '200+', description: 'Across major outlets' },
    { label: 'Awards Won', value: '12', description: 'Industry recognition' },
    { label: 'Speaking Events', value: '30+', description: 'Conferences & panels' }
  ];

  const categories = ['all', 'company', 'product', 'partnership', 'funding', 'award'];

  const filteredPressReleases = pressReleasesData.filter(release => {
    const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         release.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         release.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || release.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      company: 'bg-blue-100 text-blue-800',
      product: 'bg-green-100 text-green-800',
      partnership: 'bg-purple-100 text-purple-800',
      funding: 'bg-yellow-100 text-yellow-800',
      award: 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <PageLayout
      title="Press & Media - MobiRides News, Updates & Media Resources"
      description="Latest press releases, media kit, and resources for journalists covering MobiRides. Get the latest news, company updates, and media assets."
      keywords="MobiRides press, media kit, press releases, news, media resources, journalist resources"
      canonical="/press"
    >
      <PageHero
        title="Press & Media Center"
        subtitle="Latest News & Resources"
        description="Stay up to date with MobiRides news, announcements, and access our comprehensive media kit for journalists and media professionals."
        variant="gradient"
        ctaText="Download Media Kit"
        ctaLink="#media-kit"
      />

      {/* Press Stats */}
      <SectionWrapper className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Media Presence
            </h2>
            <p className="text-lg text-gray-600">
              Our story has been featured across major media outlets and industry publications.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {pressStats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-600">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Latest Press Releases */}
      <SectionWrapper className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Latest Press Releases
            </h2>
            <p className="text-lg text-gray-600">
              Stay informed with our latest company news and announcements.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search press releases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === 'all' ? 'All Categories' : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Press Releases Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPressReleases.map((release) => (
              <Card key={release.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={getCategoryColor(release.category)}>
                      {release.category}
                    </Badge>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(release.date)}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight mb-2">
                    {release.title}
                  </CardTitle>
                  {release.subtitle && (
                    <p className="text-sm text-gray-600 font-medium">{release.subtitle}</p>
                  )}
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {release.excerpt}
                  </p>
                  
                  {release.location && (
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {release.location}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {release.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      {release.author}
                    </div>
                    <Button variant="outline" size="sm">
                      Read More
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPressReleases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No press releases found matching your criteria.</p>
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* Media Kit */}
      <SectionWrapper className="py-16" id="media-kit">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Media Kit &amp; Resources
            </h2>
            <p className="text-lg text-gray-600">
              Download high-quality assets, brand guidelines, and company information for your stories.
            </p>
          </div>

          <DocumentDownload 
            documents={mediaKit}
            showSearch={true}
            showStats={true}
          />
        </div>
      </SectionWrapper>

      {/* Media Contacts */}
      <SectionWrapper className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Media Contacts
            </h2>
            <p className="text-lg text-gray-600">
              Connect with our communications team for interviews, quotes, and additional information.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mediaContacts.map((contact, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {contact.name}
                    </h3>
                    <p className="text-sm text-gray-600">{contact.title}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {contact.specialties.map((specialty, specialtyIndex) => (
                        <Badge key={specialtyIndex} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Press Inquiry Form */}
      <SectionWrapper className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Press Inquiries
            </h2>
            <p className="text-lg text-gray-600">
              Have a story idea or need additional information? We're here to help.
            </p>
          </div>

          <ContactForm type="business" onSubmit={undefined} />
        </div>
      </SectionWrapper>

      {/* Newsletter Signup */}
      <SectionWrapper className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Subscribe to our press newsletter to receive the latest news and announcements directly in your inbox.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email"
              className="bg-white text-gray-900 border-white"
            />
            <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </PageLayout>
  );
};

export default PressPage;