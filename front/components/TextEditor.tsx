import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import styles from '../styles/TextEditor.module.css';
import { EditorContext } from '../context/EditorState';

const TextEditor = () => {
  const [quill, setQuill] = useState(null);
  const [initialValue, setInitialValue] = useState('');

  const editorContext = useContext(EditorContext);
  const { setHtml, postToEdit, setPostToEdit } = editorContext;

  useEffect(() => {
    if (postToEdit) {
      setInitialValue(postToEdit.body);
    }

    return () => {
      setPostToEdit(null);
    };
  }, []);

  useEffect(() => {
    if (!quill) return;

    if (initialValue) {
      // const delta = quill.clipboard.convert({ html: initialValue });
      // quill.setContents(delta, 'silent');

      // This is not how this should be done!
      // Fix later
      quill.container.firstChild.innerHTML = initialValue;
    }
  }, [initialValue]);

  const wrapperRef = useCallback(wrapper => {
    if (wrapper === null) return;

    wrapper.innerHTML = '';

    const editor = document.createElement('div');
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    if (initialValue) {
      // const delta = q.clipboard.convert({ html: initialValue });
      // q.setContents(delta, 'silent');

      // This is not how this should be done!
      // Fix later
      quill.container.firstChild.innerHTML = initialValue;
    }

    setQuill(q);
  }, []);

  useEffect(() => {
    if (quill === null) return;

    const changeHandler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      const htmlContent = document.querySelector('.ql-editor').innerHTML;
      setHtml(htmlContent);
    };

    quill.on('text-change', changeHandler);

    return () => {
      quill.off('text-change', changeHandler);
    };
  }, [quill]);

  return (
    <div className={styles.editorContainer}>
      <div id="editor" ref={wrapperRef}></div>
    </div>
  );
};

const TOOLBAR_OPTIONS = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ['clean'], // remove formatting button
];

export default TextEditor;
