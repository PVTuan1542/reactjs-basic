import Post from "./Post";
import "./Model/CSS/ListPost.css";
import { PostData } from "../App";
import { TextField } from "@mui/material";
import axios from "axios";
import { POST } from "./Model/data";
import { useEffect, useState } from "react";
import Modals from "./Components/Modal";
import useModal from "./Components/useModal";

function ListPost(props: any) {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [postChange, setPostChange] = useState("");
  const { isShowing, toggle } = useModal();
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchPostsLoadMore(limit, offset);
  }, [offset]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        setOffset((prevOffset) => prevOffset + limit);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function fetchPostsLoadMore(limit: number, offset: number) {
    const response = await axios.get(
      `${POST.GET_LOAD_MORE}?limit=${limit}&offset=${offset}`
    );
    setPosts((prevData) => [...prevData, ...response.data.posts]);
  }

  // async function fetchPosts() {
  //   const response = await axios.get(POST.GET_ALL_POSTS);
  //   setPosts(response.data.posts);
  // }

  return (
    <div>
      <div>
        <div className="input_comment_post">
          <TextField
            id="outlined-basic"
            variant="outlined"
            className="input_comment"
            placeholder="Create post..."
            autoComplete="off"
            onClick={() => {
              toggle();
              setPostChange("");
            }}
          />
        </div>
        <div className="postTopRight">
          <Modals
            isShowing={isShowing}
            hide={toggle}
            setTrigger={toggle}
            setPostChange={setPostChange}
            postChange={postChange}
            posts={posts}
            setPosts={setPosts}
          />
        </div>
      </div>
      <div>
        {posts.map((post: PostData, index: number) => (
          <Post
            posts={posts}
            key={`post-${post.id}`}
            setPosts={setPosts}
            data={post}
            users={props.users}
          />
        ))}
      </div>
      {/* <div style={{ alignItems: "center", margin: "25px" }}>
        <Pagination count={10} variant="outlined" />
      </div> */}
    </div>
  );
}

export default ListPost;
