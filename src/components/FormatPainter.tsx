import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { Button } from './ui/button';
import { Paintbrush } from 'lucide-react';

interface FormatPainterProps {
  editor: Editor;
}

interface CopiedFormat {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  code?: boolean;
  textAlign?: string;
  lineHeight?: string;
  spacing?: string;
  fontSize?: string;
  color?: string;
}

export const FormatPainter: React.FC<FormatPainterProps> = ({ editor }) => {
  const [copiedFormat, setCopiedFormat] = useState<CopiedFormat | null>(null);
  const [isActive, setIsActive] = useState(false);

  const copyFormat = () => {
    const attrs = editor.getAttributes('textStyle');
    const paragraphAttrs = editor.getAttributes('paragraph');
    
    const format: CopiedFormat = {
      bold: editor.isActive('bold'),
      italic: editor.isActive('italic'),
      underline: editor.isActive('underline'),
      strike: editor.isActive('strike'),
      code: editor.isActive('code'),
      textAlign: paragraphAttrs.textAlign,
      lineHeight: paragraphAttrs.lineHeight,
      spacing: paragraphAttrs.spacing,
      fontSize: attrs.fontSize,
      color: attrs.color,
    };
    
    setCopiedFormat(format);
    setIsActive(true);
  };

  const applyFormat = () => {
    if (!copiedFormat) return;

    const chain = editor.chain().focus();

    // Apply text formatting
    if (copiedFormat.bold) chain.setBold();
    else chain.unsetBold();
    
    if (copiedFormat.italic) chain.setItalic();
    else chain.unsetItalic();
    
    if (copiedFormat.underline) chain.setUnderline();
    else chain.unsetUnderline();
    
    if (copiedFormat.strike) chain.setStrike();
    else chain.unsetStrike();
    
    if (copiedFormat.code) chain.setCode();
    else chain.unsetCode();

    // Apply paragraph formatting
    if (copiedFormat.textAlign) {
      chain.setTextAlign(copiedFormat.textAlign);
    }
    
    if (copiedFormat.lineHeight) {
      chain.setLineHeight(copiedFormat.lineHeight);
    }
    
    if (copiedFormat.spacing) {
      chain.setSpacing(copiedFormat.spacing as 'none' | 'small' | 'medium' | 'large');
    }

    // Apply text style
    if (copiedFormat.fontSize) {
      chain.setMark('textStyle', { fontSize: copiedFormat.fontSize });
    }
    
    if (copiedFormat.color) {
      chain.setColor(copiedFormat.color);
    }

    chain.run();
    setIsActive(false);
  };

  return (
    <Button
      type="button"
      variant={isActive ? 'default' : 'ghost'}
      size="sm"
      onClick={isActive ? applyFormat : copyFormat}
      title={isActive ? 'Click to apply copied format' : 'Copy format'}
      className="h-8 w-8 p-0"
    >
      <Paintbrush className={`h-4 w-4 ${isActive ? 'animate-pulse' : ''}`} />
    </Button>
  );
};
