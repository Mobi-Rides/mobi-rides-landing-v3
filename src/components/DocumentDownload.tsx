import React, { useState } from 'react';
import { Download, FileText, Image, Archive, Eye, Calendar, User, FileIcon } from 'lucide-react';
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

export interface Document {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'doc' | 'image' | 'zip' | 'excel' | 'presentation';
  category: string;
  size: string;
  downloadUrl: string;
  previewUrl?: string;
  publishedDate: string;
  lastUpdated?: string;
  author?: string;
  version?: string;
  isNew?: boolean;
  requiresAuth?: boolean;
  downloadCount?: number;
  tags: string[];
}

interface DocumentDownloadProps {
  documents: Document[];
  showSearch?: boolean;
  showFilters?: boolean;
  showStats?: boolean;
  maxDocuments?: number;
  onDownload?: (document: Document) => void;
  onPreview?: (document: Document) => void;
  className?: string;
}

const DocumentDownload: React.FC<DocumentDownloadProps> = ({
  documents,
  showSearch = true,
  showFilters = true,
  showStats = true,
  maxDocuments = 12,
  onDownload,
  onPreview,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [visibleDocs, setVisibleDocs] = useState(maxDocuments);

  // Get unique categories and types
  const categories = React.useMemo(() => {
    return Array.from(new Set(documents.map(doc => doc.category)));
  }, [documents]);

  const documentTypes = React.useMemo(() => {
    return Array.from(new Set(documents.map(doc => doc.type)));
  }, [documents]);

  // Filter documents
  const filteredDocuments = React.useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      const matchesType = selectedType === 'all' || doc.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [documents, searchTerm, selectedCategory, selectedType]);

  const displayedDocuments = filteredDocuments.slice(0, visibleDocs);
  const hasMoreDocs = filteredDocuments.length > visibleDocs;

  const handleLoadMore = () => {
    setVisibleDocs(prev => Math.min(prev + maxDocuments, filteredDocuments.length));
  };

  const getFileIcon = (type: string) => {
    const icons = {
      pdf: FileText,
      doc: FileText,
      image: Image,
      zip: Archive,
      excel: FileIcon,
      presentation: FileIcon
    };
    const IconComponent = icons[type as keyof typeof icons] || FileIcon;
    return <IconComponent className="w-8 h-8" />;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      pdf: 'bg-red-100 text-red-800',
      doc: 'bg-blue-100 text-blue-800',
      image: 'bg-green-100 text-green-800',
      zip: 'bg-purple-100 text-purple-800',
      excel: 'bg-emerald-100 text-emerald-800',
      presentation: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDownload = async (document: Document) => {
    if (onDownload) {
      onDownload(document);
    } else {
      // Default download behavior
      try {
        const response = await fetch(document.downloadUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = window.document.createElement('a');
        a.href = url;
        a.download = document.title;
        window.document.body.appendChild(a);
        a.click();
        window.document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download failed:', error);
        // Fallback to direct link
        window.open(document.downloadUrl, '_blank');
      }
    }
  };

  const handlePreview = (document: Document) => {
    if (onPreview) {
      onPreview(document);
    } else if (document.previewUrl) {
      window.open(document.previewUrl, '_blank');
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="mb-8 space-y-4">
          {/* Search */}
          {showSearch && (
            <div className="relative">
              <Input
                type="text"
                placeholder="Search documents by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          )}

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="File Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      {showStats && (
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {filteredDocuments.length}
            </div>
            <div className="text-sm text-gray-600">Documents</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {categories.length}
            </div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {documentTypes.length}
            </div>
            <div className="text-sm text-gray-600">File Types</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {documents.reduce((sum, doc) => sum + (doc.downloadCount || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Downloads</div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {displayedDocuments.length} of {filteredDocuments.length} documents
        </p>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedDocuments.map(doc => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <div className="text-blue-600">
                  {getFileIcon(doc.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg mb-2 line-clamp-2">
                    {doc.title}
                    {doc.isNew && (
                      <Badge className="ml-2 bg-green-600 text-white text-xs">New</Badge>
                    )}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className={getTypeColor(doc.type)}>
                      {doc.type.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {doc.size}
                    </Badge>
                    {doc.version && (
                      <Badge variant="outline" className="text-xs">
                        v{doc.version}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {doc.description}
              </p>

              {/* Tags */}
              {doc.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {doc.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{doc.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="space-y-2 mb-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>Published {formatDate(doc.publishedDate)}</span>
                </div>
                {doc.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span>By {doc.author}</span>
                  </div>
                )}
                {doc.downloadCount && (
                  <div className="flex items-center gap-2">
                    <Download className="w-3 h-3" />
                    <span>{doc.downloadCount} downloads</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleDownload(doc)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                {doc.previewUrl && (
                  <Button
                    onClick={() => handlePreview(doc)}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Auth Required Notice */}
              {doc.requiresAuth && (
                <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                  Login required to download
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or check back later for new documents.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedType('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Load More */}
      {hasMoreDocs && (
        <div className="text-center mt-8">
          <Button onClick={handleLoadMore} variant="outline" className="px-8">
            Load More Documents
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentDownload;