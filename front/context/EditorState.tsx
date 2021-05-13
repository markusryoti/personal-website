import { createContext, useReducer } from 'react';

export interface IProvider {
  postContent: string;
  postToEdit: any;
  postImages: string[];
  setPostContent: (content: object) => void;
  setPostToEdit: (post: null) => void;
  setPostImages: (images: string[]) => void;
}

export const EditorContext = createContext<IProvider | null>(null);

function editorReducer(state, action) {
  switch (action.type) {
    case 'SET_CONTENT':
      return {
        ...state,
        postContent: action.payload,
      };
    case 'SET_POST_TO_EDIT':
      return {
        ...state,
        postToEdit: action.payload,
      };
    case 'SET_POST_IMAGES':
      return {
        ...state,
        postImages: action.payload,
      };
    default:
      return state;
  }
}

export default function EditorState(props) {
  const initialState = {
    postContent: '',
    postToEdit: null,
    postImages: [],
  };

  const [state, dispatch] = useReducer(editorReducer, initialState);

  const setPostContent = (content) => {
    dispatch({ type: 'SET_CONTENT', payload: content });
  };

  const setPostToEdit = (post) => {
    dispatch({ type: 'SET_POST_TO_EDIT', payload: post });
  };

  const setPostImages = (images) => {
    dispatch({ type: 'SET_POST_IMAGES', payload: images });
  };

  return (
    <EditorContext.Provider
      value={{
        postContent: state.postContent,
        postToEdit: state.postToEdit,
        postImages: state.postImages,
        setPostContent,
        setPostToEdit,
        setPostImages,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
}
