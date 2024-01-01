import { FormEvent, useContext, useState } from "react";
import "./register.css";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../context/Context";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { user } = useContext(Context);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      // FIXME: better to use useNavigate() function
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" className="registerInput" placeholder="Enter your username..." onChange={(e) => setUsername(e.target.value)} />
        <label>Email</label>
        <input type="text" className="registerInput" placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" className="registerInput" placeholder="Enter your password..." onChange={(e) => setPassword(e.target.value)} />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong!</span>}
    </div>
  );
}
