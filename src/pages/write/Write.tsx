/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import "./write.css";
import { Context } from "../../context/Context";
import { Navigate } from "react-router";
import axios from "axios";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState("");

  const { user } = useContext(Context);

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
    };

    if (file) {
      const data = new FormData();
      // @ts-ignore
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      // @ts-ignore
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post("http://localhost:5000/api/posts", newPost);
      // TODO: can be apply useNavigate() instead
      window.location.replace("/post/" + res.data.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return <Navigate to="/register" replace={true} />;
  }

  return (
    <div className="write">
      {file ? (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      ) : (
        <img className="writeImg" src="http://placehold.it/500x300" alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} onChange={fileChangeHandler} />
          <input type="text" placeholder="Title" className="writeInput" autoFocus={true} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="writeFormGroup">
          <textarea placeholder="Tell your story..." className="writeInput writeText" onChange={(e) => setDesc(e.target.value)}></textarea>
        </div>

        <div className="selectBox">
          <select onChange={(e) => setCategories(e.target.value)} className="categories" defaultValue="" name="categories" id="categories">
            <option value="" disabled>
              select categories
            </option>
            <option value="fashions">fashions</option>
            <option value="news">news</option>
            <option value="sports">sports</option>
            <option value="technologies">technologies</option>
          </select>
        </div>

        <div className="btnBox">
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
