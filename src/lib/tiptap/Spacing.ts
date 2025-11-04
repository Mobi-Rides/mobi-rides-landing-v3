import { Extension } from '@tiptap/core';

export interface SpacingOptions {
  types: string[];
  spacings: {
    none: string;
    small: string;
    medium: string;
    large: string;
  };
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    spacing: {
      setSpacing: (spacing: 'none' | 'small' | 'medium' | 'large') => ReturnType;
      unsetSpacing: () => ReturnType;
    };
  }
}

export const Spacing = Extension.create<SpacingOptions>({
  name: 'spacing',

  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      spacings: {
        none: '0',
        small: '0.5rem',
        medium: '1rem',
        large: '2rem',
      },
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          spacing: {
            default: null,
            parseHTML: element => element.getAttribute('data-spacing'),
            renderHTML: attributes => {
              if (!attributes.spacing) {
                return {};
              }
              const spacingValue = this.options.spacings[attributes.spacing as keyof typeof this.options.spacings];
              return {
                'data-spacing': attributes.spacing,
                style: `margin-bottom: ${spacingValue}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setSpacing: (spacing: 'none' | 'small' | 'medium' | 'large') => ({ commands }) => {
        return this.options.types.every(type => commands.updateAttributes(type, { spacing }));
      },
      unsetSpacing: () => ({ commands }) => {
        return this.options.types.every(type => commands.resetAttributes(type, 'spacing'));
      },
    };
  },
});
