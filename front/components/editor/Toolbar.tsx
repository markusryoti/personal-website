import React from 'react';
import { useSlate } from 'slate-react';
import CustomEditor from './CustomEditor';

import styles from '../../styles/Toolbar.module.css';

const Toolbar = () => {
  const editor = useSlate();
  return (
    <div className={styles.toolbarContainer}>
      <button
        onMouseDown={event => {
          event.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
      >
        Bold
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          CustomEditor.toggleItalicMark(editor);
        }}
      >
        Italics
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          CustomEditor.toggleCodeBlock(editor);
        }}
      >
        Code
      </button>
      <select
        onChange={event => {
          CustomEditor.toggleHeading(editor, event.target.value);
        }}
      >
        <option value="p">p</option>
        <option value="h1">h1</option>
        <option value="h2">h2</option>
        <option value="h3">h3</option>
        <option value="h4">h4</option>
        <option value="h5">h5</option>
        <option value="h6">h6</option>
      </select>
    </div>
  );
};

export default Toolbar;
