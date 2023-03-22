import Comments from "../app/Components/Comments/Comments";
import { useState } from "react";
import Modals from "./Components/Modal";
import useModal from "./Components/useModal";
import "../App.css";
import "./Model/CSS/Post.css";
import iconLike from "../app/Model/Image/like.png";
import iconUnLike from "../app/Model/Image/unlike.png";

import { useNavigate } from "react-router-dom";
import { PostData } from "../App";
import { POST } from "./Model/data";
import axios from "axios";
import IconThreeDot from "./Components/ThreeDot";

function Post(props: {
  data: PostData;
  users: any;
  setPosts: any;
  posts: PostData[];
}) {
  const [postChange, setPostChange] = useState(props.data.desc);
  const { isShowing, toggle } = useModal();
  const [isShowComment, setIsShowComment] = useState(false);
  const [like, setLike] = useState(props.data.like);
  const [isLike, setIsLike] = useState(false);
  const [user] = useState(props.users[1]);

  const navigate = useNavigate();

  async function updateLikePosts() {
    await axios.post(`${POST.UPDATE_POST}/${props?.data?.id}`, {
      like: isLike ? like - 1 : like + 1,
    });
    return;
  }

  return (
    <div>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                className="postProfileImg"
                src={user.profilePicture}
                alt=""
                onClick={() => {
                  navigate("/profile", { state: user });
                }}
              />
              <span
                className="postUsername"
                onClick={() => {
                  navigate("/profile", { state: user });
                }}
              >
                {user.username}
              </span>
              <span className="postDate">15 min ago</span>
            </div>
            <div className="postTopRight">
              <Modals
                isShowing={isShowing}
                hide={toggle}
                setTrigger={toggle}
                setPostChange={setPostChange}
                postChange={postChange}
                id={props.data.id}
              />
            </div>
            <IconThreeDot
              toggle={toggle}
              id={props?.data?.id}
              posts={props.posts}
              setPosts={props.setPosts}
            />
          </div>
          <div className="postCenter">
            <span className="postText">{postChange}</span>
            <img className="postImg" src={props.data.photo} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              {isLike && <img
                className="likeIcon"
                src={iconLike}
                onClick={async () => {
                  setIsLike(!isLike);
                  console.log(isLike);
                  isLike ? setLike((n) => n - 1) : setLike((n) => n + 1);
                  await updateLikePosts();
                }}
                alt=""
              />}
              {!isLike && <img
                className="likeIcon"
                src={iconUnLike}
                onClick={async () => {
                  setIsLike(!isLike);
                  console.log(isLike);
                  isLike ? setLike((n) => n - 1) : setLike((n) => n + 1);
                  await updateLikePosts();
                }}
                alt=""
              />}
              <span className="postLikeCounter"> {like} people like it</span>
            </div>
            <div className="postBottomRight">
              <span
                className="postCommentText"
                onClick={() => {
                  setIsShowComment(!isShowComment);
                }}
              >
                comments
              </span>
            </div>
          </div>
          {isShowComment && <Comments postId={props.data.id} />}
        </div>
      </div>
    </div>
  );
}

export default Post;
