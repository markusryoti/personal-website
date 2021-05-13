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
    Editor: ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
