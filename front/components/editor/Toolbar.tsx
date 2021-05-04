import React from 'react';
import CustomEditor from './CustomEditor';

const Toolbar = ({ editor }) => {
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
