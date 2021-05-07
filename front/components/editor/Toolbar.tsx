import React from 'react';
import { useSlate } from 'slate-react';
import CustomEditor from './CustomEditor';

import styles from '../../styles/Toolbar.module.css';

const Toolbar = () => {
  const editor = useSlate();
  return (
    <div className={styles.toolbarContainer}>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleMark(editor, 'bold');
        }}
        className={
          CustomEditor.isMarkActive(editor, 'bold') ? styles.isActive : ''
        }
      >
        Bold
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleMark(editor, 'italic');
        }}
        className={
          CustomEditor.isMarkActive(editor, 'italic') ? styles.isActive : ''
        }
      >
        Italic
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleBlock(editor, 'code');
        }}
        className={
          CustomEditor.isBlockActive(editor, 'code') ? styles.isActive : ''
        }
      >
        Code
      </button>
      <select
        onChange={(event) => {
          event.preventDefault();
          CustomEditor.toggleHeading(editor, event.target.value);
        }}
        className={styles.isActive}
      >
        <option value='p'>p</option>
        <option value='h1'>h1</option>
        <option value='h2'>h2</option>
        <option value='h3'>h3</option>
        <option value='h4'>h4</option>
        <option value='h5'>h5</option>
        <option value='h6'>h6</option>
      </select>
      <button
        onClick={(event) => {
          CustomEditor.toggleBlock(editor, 'quote');
        }}
        className={
          CustomEditor.isBlockActive(editor, 'quote') ? styles.isActive : ''
        }
      >
        Quote
      </button>
      <button
        onClick={(e) => {
          CustomEditor.toggleList(editor, 'ordered-list');
        }}
        className={
          CustomEditor.isBlockActive(editor, 'ordered-list')
            ? styles.isActive
            : ''
        }
      >
        ol
      </button>
      <button
        onClick={(e) => {
          CustomEditor.toggleList(editor, 'bullet-list');
        }}
        className={
          CustomEditor.isBlockActive(editor, 'bullet-list')
            ? styles.isActive
            : ''
        }
      >
        ul
      </button>
    </div>
  );
};

export default Toolbar;
