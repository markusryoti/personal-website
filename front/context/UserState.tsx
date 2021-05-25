import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';
import setAuthToken from '../lib/setAuthToken';

export interface IProvider {
  user: any;
  setUser: (user) => void;
  loadUser: () => void;
}

export const UserContext = createContext<IProvider>({
  loadUser: () => {
    console.log('hellooo');
  },
} as IProvider);

function userReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

export default function UserState(props) {
  const initialState = {
    user: props.user,
  };

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  const [state, dispatch] = useReducer(userReducer, initialState);

  const loadUser = () => {
    const token = localStorage.getItem('token');
    if (token && !state.user) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/load-user`, {
          headers: {
            Authorization: token,
          },
        })
        .then(res => {
          if (res.status === 200) {
            const user = res.data;
            setUser(user);
            setAuthToken(token);
            return;
          }
          // Invalid token
          setAuthToken('');
        })
        .catch(err => console.log(err));
    }
    setUser(null);
  };

  const setUser = user => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        setUser,
        loadUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
