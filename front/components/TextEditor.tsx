import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import styles from '../styles/TextEditor.module.css';

const TextEditor = () => {
  const [quill, setQuill] = useState(null);

  const wrapperRef = useCallback(wrapper => {
    if (wrapper === null) return;

    wrapper.innerHTML = '';

    const editor = document.createElement('div');
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    setQuill(q);
  }, []);

  return (
    <div className={styles.editorContainer}>
      <div id="editor" ref={wrapperRef}></div>
    </div>
  );
};

const TOOLBAR_OPTIONS = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['image', 'blockquote', 'code-block'],

  ['clean'], // remove formatting button
];

export default TextEditor;
