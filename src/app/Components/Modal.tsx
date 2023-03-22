import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { photoDefault, POST, userId } from "../Model/data";
import { PostData } from "../../App";

const Modals = ({
  isShowing,
  hide,
  setTrigger,
  postChange,
  setPostChange,
  id,
  posts,
  setPosts,
}: any) => {
  let [post, setPost] = useState(postChange);

  async function updatePosts() {
    await axios.post(`${POST.UPDATE_POST}/${id}`, {
      desc: post,
    });

    return;
  }

  async function createPost() {
    const response: any = await axios.post(POST.ADD_POST, {
      desc: post,
      photo: photoDefault,
      user_id: userId,
      like: 0,
      comment: 0,
    });
    setPost("")

    setPosts((previous: any) => {
      const newPost = response.data as PostData;
      const newPosts = [newPost, ...previous];

      return newPosts;
    });
  }

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setPostChange(post);
                  id && (await updatePosts());
                  !id && (await createPost());
                  setTrigger();
                }}
              >
                <textarea
                  className="postText"
                  placeholder="Post"
                  value={post}
                  onChange={(e) => {
                    setPost(e.target.value);
                  }}
                />
                <br />
                <Button variant="contained" type="submit">
                  Save
                </Button>
                <Button
                  style={{ margin: "5px" }}
                  type="button"
                  className="btn-material"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                  variant="contained"
                >
                  <span aria-hidden="true">Cancel</span>
                </Button>
              </form>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default Modals;
