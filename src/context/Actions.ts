import { IUser } from "../../types/index";

export const LoginStart = () => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user: IUser) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Logout = () => ({
  type: "LOGOUT",
});

export const UpdateStart = () => ({
  type: "UPDATE_START",
});

export const UpdateSuccess = (user: IUser) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

export const UpdateFailure = () => ({
  type: "UPDATE_FAILURE",
});
