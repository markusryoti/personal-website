import { createContext, useReducer } from 'react';

export interface IProvider {
  html: string;
  postToEdit: any;
  setHtml: (html: string) => void;
  setPostToEdit: (post: null) => void;
}

export const EditorContext = createContext<IProvider | null>(null);

function editorReducer(state, action) {
  switch (action.type) {
    case 'SET_HTML':
      return {
        ...state,
        html: action.payload,
      };
    case 'SET_POST_TO_EDIT':
      return {
        ...state,
        postToEdit: action.payload,
      };
    default:
      return state;
  }
}

export default function EditorState(props) {
  const initialState = {
    html: '',
    postToEdit: null,
  };

  const [state, dispatch] = useReducer(editorReducer, initialState);

  const setHtml = html => {
    dispatch({ type: 'SET_HTML', payload: html });
  };

  const setPostToEdit = post => {
    dispatch({ type: 'SET_POST_TO_EDIT', payload: post });
  };

  return (
    <EditorContext.Provider
      value={{
        html: state.html,
        postToEdit: state.postToEdit,
        setHtml,
        setPostToEdit,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
}
