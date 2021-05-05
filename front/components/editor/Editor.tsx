import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Import the Slate editor factory.
import { createEditor } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';
import { initialValue } from './InitialValue';
import { CodeElement, Leaf } from './Rendering';

import Toolbar from './Toolbar';

const Editor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    console.log(value);
  }, [value]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      case 'bold':
        return (
          <strong
            style={{
              letterSpacing: 1,
              color: 'pink',
            }}
          >
            {props.children}
          </strong>
        );
      case 'italic':
        return <em>{props.children}</em>;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Toolbar />
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  );
};

export default Editor;
