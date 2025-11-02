import React from 'react';
import { Editor } from '@tiptap/react';
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Space, ChevronDown } from 'lucide-react';
import { Label } from './ui/label';

interface SpacingPanelProps {
  editor: Editor;
}

export const SpacingPanel: React.FC<SpacingPanelProps> = ({ editor }) => {
  const currentSpacing = editor.getAttributes('paragraph').spacing || 'none';
  
  const spacingOptions = [
    { value: 'none', label: 'No Spacing', description: '0rem' },
    { value: 'small', label: 'Small', description: '0.5rem' },
    { value: 'medium', label: 'Medium', description: '1rem' },
    { value: 'large', label: 'Large', description: '2rem' },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 gap-1 px-2"
          title="Paragraph spacing"
        >
          <Space className="h-4 w-4" />
          <span className="text-xs font-semibold capitalize">{currentSpacing}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-background z-50" align="start">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Paragraph Spacing</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Control the spacing after paragraphs and headings
            </p>
          </div>
          
          <div className="space-y-2">
            {spacingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .setSpacing(option.value as 'none' | 'small' | 'medium' | 'large')
                    .run()
                }
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  currentSpacing === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-accent'
                }`}
              >
                <div className="text-left">
                  <Label className="font-medium cursor-pointer">
                    {option.label}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {option.description}
                  </p>
                </div>
                {currentSpacing === option.value && (
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-xs text-primary font-semibold">Active</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Tip: Use keyboard shortcuts for quick formatting
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
