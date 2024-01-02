interface IPost {
  _id: string;
  title: string;
  desc: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  photo?: string;
  categories?: [{ name: string }];
  _v: number;
}

interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
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

type ActionWithPayload = {
  type: "LOGIN_START" | "LOGIN_SUCCESS" | "LOGIN_FAILURE" | "UPDATE_START" | "UPDATE_SUCCESS" | "UPDATE_FAILURE" | "LOGOUT";
  payload: IUserState;
};

type ActionWithoutPayload = {
  type: "LOGIN_START" | "LOGIN_SUCCESS" | "LOGIN_FAILURE" | "UPDATE_START" | "UPDATE_SUCCESS" | "UPDATE_FAILURE" | "LOGOUT";
};

type IUserAction = ActionWithPayload | ActionWithoutPayload;

export type { IPost, ICat, IUserState, IUserAction, IUser };
