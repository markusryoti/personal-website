// Import the Slate editor factory.
import {
  Editor,
  Transforms,
  Text as T,
  Element as SlateElement,
  Descendant,
} from 'slate';

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

export type EmptyText = {
  text: string;
};

export type LinkElement = { type: 'link'; url: string; children: any[] };
export type ImageElement = {
  type: 'image';
  url: string;
  children: EmptyText[];
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
  isMarkActive(editor, mark) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n[mark] === true,
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

  toggleMark(editor, mark) {
    const isActive = CustomEditor.isMarkActive(editor, mark);
    Transforms.setNodes(editor, { [mark]: isActive ? null : true } as any, {
      match: (n) => T.isText(n),
      split: true,
    });
  },

  toggleBlock(editor, type) {
    const isActive = CustomEditor.isBlockActive(editor, type);
    Transforms.setNodes(editor, { type: isActive ? 'p' : type } as any, {
      match: (n) => Editor.isBlock(editor, n),
    });
  },

  toggleHeading(editor, headingType) {
    Transforms.setNodes(editor, { type: headingType } as any);
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

  insertLink(editor, url, name) {
    if (editor.selection) {
      CustomEditor.wrapLink(editor, url, name);
    }
  },

  isLinkActive(editor) {
    const [link] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    });
    return !!link;
  },

  unwrapLink(editor) {
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    });
  },

  wrapLink(editor, url, name) {
    if (CustomEditor.isLinkActive(editor)) {
      CustomEditor.unwrapLink(editor);
    }

    const { selection } = editor;
    // const isCollapsed = selection && Range.isCollapsed(selection)
    const isCollapsed = selection;

    const link: LinkElement = {
      type: 'link',
      url,
      children: isCollapsed ? [{ text: name ? name : url }] : [],
    };

    if (isCollapsed) {
      Transforms.insertNodes(editor, link);
    } else {
      Transforms.wrapNodes(editor, link, { split: true });
      Transforms.collapse(editor, { edge: 'end' });
    }
  },

  insertImage(editor, url) {
    const text = { text: '' };
    const image: ImageElement = { type: 'image', url: url, children: [text] };
    Transforms.insertNodes(editor, image);
  },
};

export default CustomEditor;
