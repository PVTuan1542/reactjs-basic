import { useState } from "react";
import "./Model/CSS/ListPost.css";
import { useNavigate } from "react-router-dom";
import { photoDefault, POST, userId } from "./Model/data";
import axios from "axios";

function NewPost(props: any) {
  let [post, setPost] = useState("");

  const navigate = useNavigate();

  async function createPost() {
    await axios.post(POST.ADD_POST, {
      desc: post,
      photo: photoDefault,
      user_id: userId,
      like: 0,
      comment: 0,
    });
    return;
  }

  return (
    <form
      className="form-create-post"
      onSubmit={async (e) => {
        e.preventDefault();
        await createPost()
        navigate("/page");
      }}
    >
      <textarea
        className="textarea-create-post"
        placeholder="Post"
        value={post}
        onChange={(e) => {
          setPost(e.target.value);
        }}
      />
      <br />
      <button type="submit">Create</button>
    </form>
  );
}

export default NewPost;
