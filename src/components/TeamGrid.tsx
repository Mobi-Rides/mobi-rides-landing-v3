import React from 'react';
import { Linkedin, Twitter, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  image: string;
  location: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  skills: string[];
  joinedDate: string;
  isLeadership?: boolean;
}

interface TeamGridProps {
  members: TeamMember[];
  showAll?: boolean;
  maxMembers?: number;
  showDepartmentFilter?: boolean;
  showSkills?: boolean;
  showSocialLinks?: boolean;
  className?: string;
}

const TeamGrid: React.FC<TeamGridProps> = ({
  members,
  showAll = false,
  maxMembers = 8,
  showDepartmentFilter = true,
  showSkills = true,
  showSocialLinks = true,
  className = ''
}) => {
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>('all');
  const [visibleMembers, setVisibleMembers] = React.useState(maxMembers);

  // Get unique departments
  const departments = React.useMemo(() => {
    const depts = Array.from(new Set(members.map(member => member.department)));
    return ['all', ...depts];
  }, [members]);

  // Filter members by department
  const filteredMembers = React.useMemo(() => {
    if (selectedDepartment === 'all') {
      return members;
    }
    return members.filter(member => member.department === selectedDepartment);
  }, [members, selectedDepartment]);

  // Get members to display
  const displayedMembers = showAll ? filteredMembers : filteredMembers.slice(0, visibleMembers);
  const hasMoreMembers = filteredMembers.length > visibleMembers;

  const handleLoadMore = () => {
    setVisibleMembers(prev => Math.min(prev + maxMembers, filteredMembers.length));
  };

  const formatJoinedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Department Filter */}
      {showDepartmentFilter && departments.length > 2 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {departments.map(dept => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setSelectedDepartment(dept);
                  setVisibleMembers(maxMembers);
                }}
                className="capitalize"
              >
                {dept === 'all' ? 'All Team' : dept}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedMembers.map(member => (
          <Card key={member.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
              {/* Member Image */}
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {member.isLeadership && (
                  <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                    Leadership
                  </Badge>
                )}
                
                {/* Social Links Overlay */}
                {showSocialLinks && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      {member.email && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-10 h-10 p-0 rounded-full"
                          asChild
                        >
                          <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer">
                            <Mail className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {member.linkedin && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-10 h-10 p-0 rounded-full"
                          asChild
                        >
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {member.twitter && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-10 h-10 p-0 rounded-full"
                          asChild
                        >
                          <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Member Info */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium text-sm mb-1">
                    {member.role}
                  </p>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span>{member.location}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {member.bio}
                </p>

                {/* Skills */}
                {showSkills && member.skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 3).map(skill => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {member.skills.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs px-2 py-1"
                        >
                          +{member.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Department and Join Date */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <Badge variant="outline" className="text-xs">
                    {member.department}
                  </Badge>
                  <span>Since {formatJoinedDate(member.joinedDate)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      {!showAll && hasMoreMembers && (
        <div className="text-center mt-8">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            className="px-8"
          >
            Load More Team Members
          </Button>
        </div>
      )}

      {/* Team Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {members.length}
          </div>
          <div className="text-sm text-gray-600">Team Members</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {departments.length - 1}
          </div>
          <div className="text-sm text-gray-600">Departments</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {members.filter(m => m.isLeadership).length}
          </div>
          <div className="text-sm text-gray-600">Leadership</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {Array.from(new Set(members.map(m => m.location))).length}
          </div>
          <div className="text-sm text-gray-600">Locations</div>
        </div>
      </div>
    </div>
  );
};

export default TeamGrid;