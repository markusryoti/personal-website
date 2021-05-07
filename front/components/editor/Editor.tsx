import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

// Import the Slate editor factory.
import { createEditor } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';
import { initialValue } from './InitialValue';
import { CodeElement, Leaf } from './Rendering';

import Toolbar from './Toolbar';

import styles from '../../styles/Editor.module.css';
import { EditorContext } from '../../context/EditorState';

const Editor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState(initialValue);

  const { setPostContent } = useContext(EditorContext);

  useEffect(() => {
    setPostContent(value);
  }, [value]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'h1':
        return <h1>{props.children}</h1>;
      case 'h2':
        return <h2>{props.children}</h2>;
      case 'h3':
        return <h3>{props.children}</h3>;
      case 'h4':
        return <h4>{props.children}</h4>;
      case 'h5':
        return <h5>{props.children}</h5>;
      case 'h6':
        return <h6>{props.children}</h6>;
      case 'code':
        return <CodeElement {...props} />;
      case 'bold':
        return <strong>{props.children}</strong>;
      case 'italic':
        return <em>{props.children}</em>;
      case 'quote':
        return <blockquote>{props.children}</blockquote>;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div className={styles.editorContainer}>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Toolbar />
        <div className={styles.textContainer}>
          <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
        </div>
      </Slate>
    </div>
  );
};

export default Editor;
