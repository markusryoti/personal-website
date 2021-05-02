import { createContext, useReducer } from 'react';

export interface IProvider {
  html: string;
  setHtml: (html: string) => void;
}

export const EditorContext = createContext<IProvider | null>(null);

function editorReducer(state, action) {
  switch (action.type) {
    case 'SET_HTML':
      return {
        ...state,
        html: action.payload,
      };
    default:
      return state;
  }
}

export default function EditorState(props) {
  const initialState = {
    html: '',
  };

  const [state, dispatch] = useReducer(editorReducer, initialState);

  const setHtml = html => {
    dispatch({ type: 'SET_HTML', payload: html });
  };

  return (
    <EditorContext.Provider
      value={{
        html: state.html,
        setHtml,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
}
