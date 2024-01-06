interface IPost {
  _id: string;
  title: string;
  desc: string;
  username: string;
  createdAt: string;
  photo?: string;
  categories?: [{ name: string }];
}

interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  createdAt: string;
}

interface ICat {
  _id: string;
  name: string;
}

interface IUserState {
  user: IUser;
  isFetching: boolean;
  error: boolean;
}

type Action =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: IUserState }
  | { type: "LOGIN_FAILURE" }
  | { type: "UPDATE_START" }
  | { type: "UPDATE_SUCCESS"; payload: IUserState }
  | { type: "UPDATE_FAILURE" }
  | { type: "LOGOUT" };

// interface IAction {
//   type: "LOGIN_START" | "LOGIN_SUCCESS" | "LOGIN_FAILURE" | "UPDATE_START" | "UPDATE_SUCCESS" | "UPDATE_FAILURE" | "LOGOUT";
//   payload?: IUserState;
// }

// type ActionWithPayload = {
//   type: "LOGIN_START" | "LOGIN_SUCCESS" | "LOGIN_FAILURE" | "UPDATE_START" | "UPDATE_SUCCESS" | "UPDATE_FAILURE" | "LOGOUT";
//   payload?: IUserState;
// };

// type ActionWithoutPayload = {
//   type: "LOGIN_START" | "LOGIN_SUCCESS" | "LOGIN_FAILURE" | "UPDATE_START" | "UPDATE_SUCCESS" | "UPDATE_FAILURE" | "LOGOUT";
// };

// type IUserAction = ActionWithPayload | ActionWithoutPayload;

export type { IPost, ICat, IUserState, Action, IUser };
