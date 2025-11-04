import { Extension } from '@tiptap/core';

export interface FontSizeOptions {
  types: string[];
  sizes: {
    small: string;
    normal: string;
    large: string;
    xlarge: string;
  };
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customFontSize: {
      setCustomFontSize: (size: 'small' | 'normal' | 'large' | 'xlarge') => ReturnType;
      unsetCustomFontSize: () => ReturnType;
    };
  }
}

export const FontSize = Extension.create<FontSizeOptions>({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle'],
      sizes: {
        small: '0.875rem',
        normal: '1rem',
        large: '1.25rem',
        xlarge: '1.5rem',
      },
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setCustomFontSize: (size: 'small' | 'normal' | 'large' | 'xlarge') => ({ chain }) => {
        const fontSize = this.options.sizes[size];
        return chain().setMark('textStyle', { fontSize }).run();
      },
      unsetCustomFontSize: () => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
      },
    };
  },
});
