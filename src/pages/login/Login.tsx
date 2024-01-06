import axios from "axios";
import { FormEvent, useContext, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // console.log(userRef.current?.value);
    // console.log(passwordRef.current?.value);

    try {
      dispatch({ type: "LOGIN_START" });
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: userRef.current?.value,
        password: passwordRef.current?.value,
      });
      // console.log(res.data.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" className="loginInput" placeholder="Enter your username..." ref={userRef} />
        <label>Password</label>
        <input type="password" className="loginInput" placeholder="Enter your password..." ref={passwordRef} />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
