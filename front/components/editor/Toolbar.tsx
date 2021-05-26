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
          CustomEditor.toggleMark(editor, 'bold');
        }}
        className={
          CustomEditor.isMarkActive(editor, 'bold') ? styles.isActive : ''
        }
      >
        <i className="fas fa-bold"></i>
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          CustomEditor.toggleMark(editor, 'italic');
        }}
        className={
          CustomEditor.isMarkActive(editor, 'italic') ? styles.isActive : ''
        }
      >
        <i className="fas fa-italic"></i>
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          CustomEditor.toggleBlock(editor, 'code');
        }}
        className={
          CustomEditor.isBlockActive(editor, 'code') ? styles.isActive : ''
        }
      >
        <i className="fas fa-code"></i>
      </button>
      <select
        onChange={event => {
          event.preventDefault();
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
      <button
        onClick={event => {
          CustomEditor.toggleBlock(editor, 'quote');
        }}
        className={
          CustomEditor.isBlockActive(editor, 'quote') ? styles.isActive : ''
        }
      >
        <i className="fas fa-quote-right"></i>
      </button>
      <button
        onClick={e => {
          CustomEditor.toggleList(editor, 'ordered-list');
        }}
        className={
          CustomEditor.isBlockActive(editor, 'ordered-list')
            ? styles.isActive
            : ''
        }
      >
        <i className="fas fa-list-ol"></i>
      </button>
      <button
        onClick={e => {
          CustomEditor.toggleList(editor, 'bullet-list');
        }}
        className={
          CustomEditor.isBlockActive(editor, 'bullet-list')
            ? styles.isActive
            : ''
        }
      >
        <i className="fas fa-list-ul"></i>
      </button>
      <button
        className={CustomEditor.isLinkActive(editor) ? styles.isActive : ''}
        onMouseDown={event => {
          event.preventDefault();
          const url = window.prompt('Enter the URL of the link:');
          if (!url) return;
          const name = window.prompt(
            'Enter optional name for link or leave blank for url:'
          );
          CustomEditor.insertLink(editor, url, name);
        }}
      >
        <i className="fas fa-link"></i>
      </button>
      <button
        className={CustomEditor.isLinkActive(editor) ? styles.isActive : ''}
        onMouseDown={event => {
          if (CustomEditor.isLinkActive(editor)) {
            CustomEditor.unwrapLink(editor);
          }
        }}
      >
        <i className="fas fa-unlink"></i>
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          const url = window.prompt('Enter the URL of the image:');
          // if (url && !isImageUrl(url)) {
          //   alert('URL is not an image');
          //   return;
          // }
          CustomEditor.insertImage(editor, url);
        }}
      >
        <i className="far fa-image"></i>
      </button>
    </div>
  );
};

export default Toolbar;
