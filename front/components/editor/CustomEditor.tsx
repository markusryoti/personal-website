// Import the Slate editor factory.
import { Editor, Transforms, Text as T } from 'slate';

// TypeScript Users only add this code
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

export type CustomEditor = BaseEditor & ReactEditor;

export type ParagraphElement = {
  type: 'paragraph';
  children: CustomText[];
};

export type HeadingElement = {
  type: 'heading';
  level: number;
  children: CustomText[];
};

export type ListElement = {
  type: string;
  children: any[];
};

export type CustomElement = ListElement | ParagraphElement | HeadingElement;
export type FormattedText = { text: string; bold: boolean; italic: boolean };
export type CustomText = FormattedText;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const LIST_TYPES = ['ordered-list', 'bullet-list'];

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isBlockActive(editor, type) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === type,
    });

    return !!match;
  },

  isItalicMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.italic === true,
      universal: true,
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(editor, { bold: isActive ? null : true } as any, {
      match: (n) => T.isText(n),
      split: true,
    });
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isBlockActive(editor, 'code');
    Transforms.setNodes(editor, { type: isActive ? null : 'code' } as any, {
      match: (n) => Editor.isBlock(editor, n),
    });
  },

  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    Transforms.setNodes(editor, { italic: isActive ? null : true } as any, {
      match: (n) => T.isText(n),
      split: true,
    });
  },

  toggleHeading(editor, headingType) {
    Transforms.setNodes(editor, { type: headingType } as any);
  },

  toggleQuote(editor) {
    const isActive = CustomEditor.isBlockActive(editor, 'quote');
    Transforms.setNodes(editor, { type: isActive ? null : 'quote' } as any, {
      match: (n) => Editor.isBlock(editor, n),
    });
  },

  toggleList(editor, listType) {
    const isActive = CustomEditor.isBlockActive(editor, listType);
    const isList = LIST_TYPES.includes(listType);

    Transforms.unwrapNodes(editor, {
      match: (n) => LIST_TYPES.includes(!Editor.isEditor(n) && n.type),
      split: true,
    } as any);

    const newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : listType,
    } as any;

    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: listType, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },
};

export default CustomEditor;
