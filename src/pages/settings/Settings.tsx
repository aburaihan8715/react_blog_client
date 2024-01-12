/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Context } from "../../context/Context";
import { Navigate } from "react-router";
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState<File | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  // @ts-expect-error
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      //@ts-ignore
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      //@ts-ignore
      updatedUser.profilePic = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put("http://localhost:5000/api/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  if (!user) {
    return <Navigate to="/register" replace={true} />;
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>

        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {(user.profilePic || file) && <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />}

            {!user.profilePic && !file && <img src="http://placehold.it/80x80" alt="" />}

            {/* <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" /> */}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} onChange={fileChangeHandler} />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>Profile has been updated...</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
