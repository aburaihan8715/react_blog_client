import { ReactNode, createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
import { IUser } from "../../types/index";

const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;

const INITIAL_STATE = {
  user: user,
  error: false,
  isFetching: false,
};

interface IContextValue {
  user: IUser;
  isFetching: boolean;
  error: boolean;
  dispatch: unknown;
}

export const Context = createContext<IContextValue | typeof INITIAL_STATE>(INITIAL_STATE);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
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
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
