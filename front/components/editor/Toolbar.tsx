import React from 'react';
import { useSlate } from 'slate-react';
import CustomEditor from './CustomEditor';

const Toolbar = () => {
  const editor = useSlate();
  return (
    <div>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
      >
        Bold
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleItalicMark(editor);
        }}
      >
        Italics
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleCodeBlock(editor);
        }}
      >
        Code
      </button>
    </div>
  );
};

export default Toolbar;
