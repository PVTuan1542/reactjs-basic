import Comment from "./Comment";
import { useEffect, useState } from "react";
import Modals from "./Components/Modal";
import useModal from "./Components/useModal";
import "../App.css";
import "./Model/CSS/Post.css";
import iconLike from "../app/Model/Image/like.png";
import iconHeart from "../app/Model/Image/heart.png";
import iconThreeDot from "../app/Model/Image/iconBT.jpg";
import { PostContext } from "./Components/PostContext";
import { useNavigate } from "react-router-dom";
import { PostData } from "../App";

function Post(props: { data: PostData; updateData: any; users: any }) {
  const [postChange, setPostChange] = useState(props.data.desc);
  const { isShowing, toggle } = useModal();
  const [isShowComment, setIsShowComment] = useState(false);
  const [like, setLike] = useState(props.data.like);
  const [isLike, setIsLike] = useState(false);
  const [user] = useState(props.users[props.data.userId - 1]);
  const [comments, setComments]: [
    { id: number; comment: string; replies: any[] }[],
    any
  ] = useState([]);
  const navigate = useNavigate();

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
              <img
                onClick={toggle}
                className="postProfileImg"
                src={iconThreeDot}
                alt=""
              />
              <PostContext.Provider value={props.data}>
                <Modals
                  isShowing={isShowing}
                  hide={toggle}
                  setTrigger={toggle}
                  setPostChange={setPostChange}
                  postChange={postChange}
                  updateData={props.updateData}
                  id={props.data.id}
                />
              </PostContext.Provider>
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{postChange}</span>
            <img className="postImg" src={props.data.photo} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src={iconHeart}
                onClick={() => {
                  setIsLike(!isLike);
                  isLike ? setLike((n) => n - 1) : setLike((n) => n + 1);
                }}
                alt=""
              />
              <img
                className="likeIcon"
                src={iconLike}
                onClick={() => {
                  setIsLike(!isLike);
                  isLike ? setLike((n) => n + 1) : setLike((n) => n - 1);
                }}
                alt=""
              />
              <span className="postLikeCounter"> {like} people like it</span>
            </div>
            <div className="postBottomRight">
              <span
                className="postCommentText"
                onClick={(e) => {
                  setIsShowComment(!isShowComment);
                }}
              >
                comments
              </span>
            </div>
          </div>
          {isShowComment && (
            <Comment
              comments={comments}
              setComments={setComments}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
