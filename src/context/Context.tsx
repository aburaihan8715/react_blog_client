import { ReactNode, createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;

const INITIAL_STATE = {
  user: user,
  error: false,
  isFetching: true,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
