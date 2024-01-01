import Post from "../post/Post";
import "./posts.css";
import { IPost } from "../../../types/index";

export default function Posts({ posts }: { posts: IPost[] }) {
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  );
}
