import Post from "./Post";
import "./Model/CSS/ListPost.css";
import { PostData } from "../App";
import { Pagination } from "@mui/material";

function ListPost(props: any) {
  function updateData(post: PostData) {
    if (!post.id) return;
    const objIndex = props.posts.findIndex((obj: any) => obj.id === post.id);
    props.posts[objIndex] = { ...props.posts[objIndex], ...post };
  }

  return (
    <div>
      <div>
        {props.posts.map((post: PostData, index: number) => (
          <div key={index}>
            <Post data={post} updateData={updateData} users={props.users} />
          </div>
        ))}
      </div>
      <div style={{ alignItems: "center", margin: "25px" }}>
        <Pagination count={10} variant="outlined" />
      </div>
    </div>
  );
}

export default ListPost;
