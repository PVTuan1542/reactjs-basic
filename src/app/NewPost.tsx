import { useState } from "react";
import "./Model/CSS/ListPost.css"
import { useNavigate } from "react-router-dom";

function NewPost(props: any) {
  let [post, setPost] = useState("");
  const navigate = useNavigate();

  function handleCreatePost() {
    const newPosts = props.posts
    newPosts.push({
      id: props.posts.length + 1,
      desc: post,
      photo: "",
      date: new Date().toLocaleTimeString(),
      userId: 2,
      like: 3,
      comment: 4,
    })
    
    props.setPosts(newPosts)
  }

  return(
    <form className="form-create-post"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreatePost();
          navigate("/page")
        }}
      >
        <textarea className="textarea-create-post"
          placeholder="Post"
          value={post}
          onChange={(e) => {
            setPost(e.target.value);
          }}
        />
        <br />
        <button type="submit">Create</button>
      </form>
  )
}

export default NewPost