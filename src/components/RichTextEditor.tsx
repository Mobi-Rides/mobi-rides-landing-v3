import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { LineHeight } from '@/lib/tiptap/LineHeight';
import { Spacing } from '@/lib/tiptap/Spacing';
import { FontSize } from '@/lib/tiptap/FontSize';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  Table as TableIcon,
  Indent,
  Outdent,
  Underline as UnderlineIcon,
  Type,
  Space,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start writing your blog post...',
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'my-6 leading-relaxed',
          },
        },
        hardBreak: {
          HTMLAttributes: {
            class: 'block my-2',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-outside ml-6 my-6 space-y-2',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-outside ml-6 my-6 space-y-2',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'leading-relaxed',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-muted pl-4 italic my-6 text-muted-foreground',
          },
        },
        horizontalRule: false, // We'll use the dedicated extension
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-sm',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary hover:underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      LineHeight.configure({
        types: ['paragraph', 'heading'],
        heights: ['1', '1.15', '1.5', '1.75', '2'],
        defaultHeight: '1.5',
      }),
      Spacing.configure({
        types: ['paragraph', 'heading'],
      }),
      FontSize.configure({
        types: ['textStyle'],
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
      HorizontalRule.configure({
        HTMLAttributes: {
          class: 'my-8 border-border',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full my-6',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border-b border-border',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'font-bold text-left p-2 bg-muted',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-border p-2',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'blog-content focus:outline-none min-h-[400px] p-4',
      },
    },
  });

  // Update editor content when prop changes
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const ToolbarButton: React.FC<{
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
  }> = ({ onClick, isActive, children, title }) => (
    <Button
      type="button"
      variant={isActive ? 'default' : 'ghost'}
      size="sm"
      onClick={onClick}
      title={title}
      className="h-8 w-8 p-0"
    >
      {children}
    </Button>
  );

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          title="Code"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-8" />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          isActive={editor.isActive('heading', { level: 4 })}
          title="Heading 4"
        >
          <Heading4 className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          isActive={editor.isActive('heading', { level: 5 })}
          title="Heading 5"
        >
          <Heading5 className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          isActive={editor.isActive('heading', { level: 6 })}
          title="Heading 6"
        >
          <Heading6 className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-8" />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-8" />

        {/* Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-8" />

        {/* Media & Links */}
        <ToolbarButton
          onClick={addLink}
          isActive={editor.isActive('link')}
          title="Add Link"
        >
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={addImage}
          title="Add Image"
        >
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={addTable}
          title="Insert Table"
        >
          <TableIcon className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-8" />

        {/* Font Size Controls */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setCustomFontSize('small').run()}
          title="Small Font"
        >
          <Type className="h-3 w-3" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setCustomFontSize('normal').run()}
          title="Normal Font"
        >
          <Type className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setCustomFontSize('large').run()}
          title="Large Font"
        >
          <Type className="h-5 w-5" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setCustomFontSize('xlarge').run()}
          title="Extra Large Font"
        >
          <Type className="h-6 w-6" />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-8" />

        {/* Line Height Controls */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setLineHeight('1').run()}
          isActive={editor.getAttributes('paragraph').lineHeight === '1'}
          title="Single Line Height (1.0)"
        >
          <span className="text-xs font-semibold">1.0</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setLineHeight('1.15').run()}
          isActive={editor.getAttributes('paragraph').lineHeight === '1.15'}
          title="Line Height 1.15"
        >
          <span className="text-xs font-semibold">1.15</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setLineHeight('1.5').run()}
          isActive={editor.getAttributes('paragraph').lineHeight === '1.5'}
          title="1.5 Line Height"
        >
          <span className="text-xs font-semibold">1.5</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setLineHeight('2').run()}
          isActive={editor.getAttributes('paragraph').lineHeight === '2'}
          title="Double Line Height (2.0)"
        >
          <span className="text-xs font-semibold">2.0</span>
        </ToolbarButton>

        <Separator orientation="vertical" className="h-8" />

        {/* Spacing Controls */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setSpacing('none').run()}
          isActive={editor.getAttributes('paragraph').spacing === 'none'}
          title="No Spacing"
        >
          <Space className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setSpacing('small').run()}
          isActive={editor.getAttributes('paragraph').spacing === 'small'}
          title="Small Spacing"
        >
          <span className="text-xs font-semibold">S</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setSpacing('medium').run()}
          isActive={editor.getAttributes('paragraph').spacing === 'medium'}
          title="Medium Spacing"
        >
          <span className="text-xs font-semibold">M</span>
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setSpacing('large').run()}
          isActive={editor.getAttributes('paragraph').spacing === 'large'}
          title="Large Spacing"
        >
          <span className="text-xs font-semibold">L</span>
        </ToolbarButton>

        <Separator orientation="vertical" className="h-8" />

        {/* Indentation Controls */}
        <ToolbarButton
          onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
          title="Indent"
          isActive={false}
        >
          <Indent className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().liftListItem('listItem').run()}
          title="Outdent"
          isActive={false}
        >
          <Outdent className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-8" />

        {/* Undo/Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <div className="min-h-[400px] bg-white">
        <EditorContent 
          editor={editor} 
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};