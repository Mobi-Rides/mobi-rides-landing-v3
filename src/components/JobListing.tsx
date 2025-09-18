import React, { useState } from 'react';
import { MapPin, Clock, Users, Briefcase, ExternalLink, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  level: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedDate: string;
  applicationDeadline?: string;
  isRemote: boolean;
  isUrgent?: boolean;
  applicationUrl?: string;
  contactEmail?: string;
}

interface JobListingProps {
  jobs: JobPosition[];
  showFilters?: boolean;
  showSalary?: boolean;
  maxJobs?: number;
  onApply?: (job: JobPosition) => void;
  className?: string;
}

const JobListing: React.FC<JobListingProps> = ({
  jobs,
  showFilters = true,
  showSalary = true,
  maxJobs = 10,
  onApply,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [visibleJobs, setVisibleJobs] = useState(maxJobs);

  // Get unique filter options
  const departments = React.useMemo(() => {
    return Array.from(new Set(jobs.map(job => job.department)));
  }, [jobs]);

  const locations = React.useMemo(() => {
    return Array.from(new Set(jobs.map(job => job.location)));
  }, [jobs]);

  const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];
  const jobLevels = ['entry', 'mid', 'senior', 'lead', 'executive'];

  // Filter jobs
  const filteredJobs = React.useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
      const matchesType = selectedType === 'all' || job.type === selectedType;
      const matchesLevel = selectedLevel === 'all' || job.level === selectedLevel;
      const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;

      return matchesSearch && matchesDepartment && matchesType && matchesLevel && matchesLocation;
    });
  }, [jobs, searchTerm, selectedDepartment, selectedType, selectedLevel, selectedLocation]);

  const displayedJobs = filteredJobs.slice(0, visibleJobs);
  const hasMoreJobs = filteredJobs.length > visibleJobs;

  const handleLoadMore = () => {
    setVisibleJobs(prev => Math.min(prev + maxJobs, filteredJobs.length));
  };

  const formatSalary = (salary: JobPosition['salary']) => {
    if (!salary) return null;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: salary.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'full-time': 'bg-green-100 text-green-800',
      'part-time': 'bg-blue-100 text-blue-800',
      'contract': 'bg-orange-100 text-orange-800',
      'internship': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'entry': 'bg-green-100 text-green-800',
      'mid': 'bg-blue-100 text-blue-800',
      'senior': 'bg-orange-100 text-orange-800',
      'lead': 'bg-red-100 text-red-800',
      'executive': 'bg-purple-100 text-purple-800'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleApply = (job: JobPosition) => {
    if (onApply) {
      onApply(job);
    } else if (job.applicationUrl) {
      window.open(job.applicationUrl, '_blank');
    } else if (job.contactEmail) {
      window.location.href = `mailto:${job.contactEmail}?subject=Application for ${job.title}`;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Filters */}
      {showFilters && (
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search jobs by title, description, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {jobTypes.map(type => (
                  <SelectItem key={type} value={type} className="capitalize">
                    {type.replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {jobLevels.map(level => (
                  <SelectItem key={level} value={level} className="capitalize">
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {displayedJobs.length} of {filteredJobs.length} positions
        </p>
      </div>

      {/* Job Cards */}
      <div className="space-y-6">
        {displayedJobs.map(job => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <CardTitle className="text-xl text-gray-900 flex-1">
                      {job.title}
                      {job.isUrgent && (
                        <Badge className="ml-2 bg-red-600 text-white">Urgent</Badge>
                      )}
                    </CardTitle>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                      {job.isRemote && <Badge variant="outline" className="ml-1">Remote</Badge>}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Posted {formatDate(job.postedDate)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className={getTypeColor(job.type)}>
                      {job.type.replace('-', ' ')}
                    </Badge>
                    <Badge className={getLevelColor(job.level)}>
                      {job.level} level
                    </Badge>
                    {showSalary && job.salary && (
                      <Badge variant="outline">
                        {formatSalary(job.salary)}
                      </Badge>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => handleApply(job)}
                  className="bg-blue-600 hover:bg-blue-700 shrink-0"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {job.description}
              </p>

              {/* Key Requirements */}
              {job.requirements.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Key Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0" />
                        {req}
                      </li>
                    ))}
                    {job.requirements.length > 3 && (
                      <li className="text-blue-600 text-sm">
                        +{job.requirements.length - 3} more requirements
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Application Deadline */}
              {job.applicationDeadline && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Application Deadline:</strong> {formatDate(job.applicationDeadline)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No positions found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or check back later for new opportunities.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedDepartment('all');
              setSelectedType('all');
              setSelectedLevel('all');
              setSelectedLocation('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Load More */}
      {hasMoreJobs && (
        <div className="text-center mt-8">
          <Button onClick={handleLoadMore} variant="outline" className="px-8">
            Load More Positions
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobListing;