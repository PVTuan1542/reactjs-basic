import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { COMMENT, userId } from "../../Model/data";
import { CommentData } from "../../../App";
import Comment from "./Comment";

export default function Comments(props: any) {
  const [comments, setComments]: [CommentData[], any] = useState([]);
  const [comment, setCommentText] = useState("");

  useEffect(() => {
    showListComments();
  }, []);

  async function showListComments() {
    const response =
      props?.postId &&
      ((await axios.get(`${COMMENT.GET_BY_POST_ID}/${props?.postId}`)) as any);
    setComments(response?.data?.comments ?? []);

    return;
  }

  async function onCreateComment(text: string) {
    setCommentText("");

    const response: any = await axios.post(COMMENT.ADD, {
      user_id: userId,
      post_id: props?.postId,
      text,
    });
    let oldComments = [...comments];
    oldComments.push(response.data);

    setComments(oldComments);
    return;
  }

  async function onDeleteComment(id: number) {
    await axios.delete(`${COMMENT.DELETE}/${id}`);
    

    console.log()

    setComments((previous: any) => {
      const newComments = previous.filter((element: any) => element.id !== id);

      return newComments
    });
  }

  async function onUpdateComment(id: number, comment: any) {
    await axios.post(`${COMMENT.UPDATE}/${id}`, { text: comment });
    const newComments = [] as CommentData[];

    comments.forEach((element: CommentData) => {
      if (element.id === id) {
        newComments.push({ ...element, text: comment });
      } else {
        newComments.push(element);
      }
    });

    setComments(newComments);
    return;
  }

  return (
    <div>
      <ul>
        <div className="user_avatar">
          <img src="" alt="" />
        </div>
        <form
          className="form_comment"
          onSubmit={async (e) => {
            e.preventDefault();
            await onCreateComment(comment);
          }}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            className="input_comment"
            placeholder="Join the conversation.."
            value={comment}
            onChange={(e) => {
              setCommentText(e.target.value);
            }}
          />
          <Button
            className="btn-material"
            variant="contained"
            title="reply"
            style={{ margin: "5px" }}
            type="submit"
          >
            Comment
          </Button>
        </form>
      </ul>
      <ul className="list-comment">
        {comments.map((comment: any, key: any) => {
          return (
            <Comment
              comments={comments}
              comment={comment}
              key={`comment-${comment.id}`}
              onDeleteComment={onDeleteComment}
              onUpdateComment={onUpdateComment}
            />
          );
        })}
      </ul>
    </div>
  );
}
