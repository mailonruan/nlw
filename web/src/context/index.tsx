import React, {createContext, useReducer } from 'react';

interface User {
  name: string;
  email: string;
  token: string;
}

interface Location {
  long: number;
  lat: number;
  city?: string;
  state?: string;
}

interface ContextData {
  auth?: string;
  user?: User;
  location?: Location;
}

type ReducerAction =
  | { type: 'login', payload: User }
  | { type: 'setLocation', payload: Location };

  type ContextType = {
    state: ContextData;
    dispatch: React.Dispatch<ReducerAction>;
  }

export const Context = createContext<ContextType>({} as ContextType);

function reducer(state: ContextData, action: ReducerAction) {
  switch(action.type) {
    case 'setLocation':
      return { ...state, location: action.payload };
    case 'login':
      localStorage.setItem('happyToken', action.payload.token);
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

const Provider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <Context.Provider
      value={{state, dispatch}}>
      {children}
    </Context.Provider>
  );
};

export default Provider;