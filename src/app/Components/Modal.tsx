import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { PostContext } from "./PostContext";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";

const Modals = ({
  isShowing,
  hide,
  setTrigger,
  postChange,
  setPostChange,
  updateData,
}: any) => {
  let [post, setPost] = useState(postChange);
  const value = useContext(PostContext);

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
                onSubmit={(e) => {
                  e.preventDefault();
                  setPostChange(post);
                  updateData({ id: value.id, desc: post });
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
