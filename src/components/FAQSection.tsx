import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  tags?: string[];
}

interface FAQSectionProps {
  items: FAQItem[];
  searchable?: boolean;
  categories?: string[];
  defaultExpanded?: string[];
  title?: string;
  description?: string;
  className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  items,
  searchable = true,
  categories = [],
  defaultExpanded = [],
  title = 'Frequently Asked Questions',
  description,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter items based on search term and category
  const filteredItems = items.filter(item => {
    const matchesSearch = !searchTerm || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Search and Filters */}
        {(searchable || categories.length > 0) && (
          <div className="mb-8 space-y-4">
            {searchable && (
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}
            
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant={selectedCategory === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredItems.length > 0 ? (
            <Accordion 
              type="multiple" 
              defaultValue={defaultExpanded}
              className="space-y-4"
            >
              {filteredItems.map((item) => (
                <AccordionItem 
                  key={item.id} 
                  value={item.id}
                  className="border border-gray-200 rounded-lg px-6 bg-white shadow-sm"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <div className="flex flex-col items-start gap-2">
                      <span className="font-semibold text-gray-900">
                        {item.question}
                      </span>
                      {item.category && (
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-4">
                        {item.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No questions found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;