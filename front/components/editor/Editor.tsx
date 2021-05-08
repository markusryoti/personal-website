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
import { Slate, Editable, withReact } from 'slate-react';

import Toolbar from './Toolbar';

import styles from '../../styles/Editor.module.css';
import { EditorContext } from '../../context/EditorState';
import { Leaf, renderJsonToHtml } from '../JsonToHtml';
import withLinks from './withLinks';

const Editor = ({ initialValue }) => {
  const editor = useMemo(() => withLinks(withReact(createEditor())), []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState(initialValue);
  const { setPostContent } = useContext(EditorContext);

  useEffect(() => {
    setPostContent(value);
  }, [value]);

  const renderElement = useCallback((props) => {
    return renderJsonToHtml(props);
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
