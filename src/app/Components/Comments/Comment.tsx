import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { COMMENT, userId } from "../../Model/data";
import { CommentData } from "../../../App";
import Reply from "./Reply";

export default function Comment(props: any) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [replies, setReplies] = useState([] as CommentData[]);
  const [reply, setReply] = useState("");
  const [updateComment, setUpdateComment] = useState(props.comment.text);

  useEffect(() => {
    showListReply();
  }, []);

  async function showListReply() {
    const response =
      props?.comment &&
      ((await axios.get(
        `${COMMENT.GET_BY_PARENT_ID}/${props?.comment?.id}`
      )) as any);
    setReplies(response?.data?.comments ?? []);
  }

  async function onCreateReply(comment: CommentData, reply: string) {
    const response: any = await axios.post(COMMENT.ADD, {
      user_id: userId,
      post_id: comment.post_id,
      parent_id: comment.id,
      like: 1,
      text: reply,
    });
    let oldReplies = [...replies];
    oldReplies.push(response.data);
    setReplies(oldReplies);

    return;
  }

  async function onDeleteReply(id: number) {
    await axios.delete(`${COMMENT.DELETE}/${id}`);
    const newReplies = replies.filter((element: any) => element.id !== id);

    setReplies(newReplies);
    return;
  }

  async function onUpdateReply(id: number, reply: string) {
    await axios.post(`${COMMENT.UPDATE}/${id}`, { text: reply });
    const newReplies = [] as CommentData[];

    replies.forEach((element: CommentData) => {
      if (element.id === id) {
        newReplies.push({ ...element, text: reply });
      } else {
        newReplies.push(element);
      }
    });
    setReplies(newReplies);

    return;
  }

  if (isUpdate) {
    return (
      <li>
        <form
          className="form_comment"
          onSubmit={(e) => {
            e.preventDefault();
            setIsUpdate(!isUpdate);
          }}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            className="input_comment"
            placeholder="Join the conversation.."
            value={updateComment}
            onChange={(e) => {
              setUpdateComment(e.target.value);
            }}
          />
          <Button
            className="btn-material"
            variant="contained"
            title="delete"
            style={{ margin: "5px" }}
            type="submit"
            onClick={async () => {
              await props.onUpdateComment(props.comment.id, updateComment);
            }}
          >
            Save
          </Button>
        </form>
      </li>
    );
  }

  return (
    <div>
      <div className="action-comment">
        <div className="content-comment">{props.comment.text}</div>
        <div>
          <Button
            className="btn-material"
            variant="contained"
            type="button"
            title="update"
            style={{ margin: "5px" }}
            onClick={() => {
              setIsUpdate(!isUpdate);
            }}
          >
            Update
          </Button>
          <Button
            className="btn-material"
            variant="contained"
            color="error"
            title="delete"
            style={{ margin: "5px" }}
            onClick={async () => {
              await props.onDeleteComment(props.comment.id);
            }}
          >
            Delete
          </Button>
          <Button
            className="btn-material"
            variant="contained"
            type="button"
            title="reply"
            style={{ margin: "5px" }}
            onClick={() => {
              setIsReply(!isReply);
            }}
          >
            Reply
          </Button>
        </div>
      </div>
      <div>
        {replies.map((reply: CommentData, key) => {
          return (
            <Reply
              reply={reply}
              key={`reply-${reply.id}`}
              onDeleteReply={onDeleteReply}
              onUpdateReply={onUpdateReply}
            />
          );
        })}
      </div>
      <div>
        <div>
          {isReply && (
            <form
              className="form_comment_reply"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="input_comment"
                placeholder="Join the conversation.."
                value={reply}
                onChange={(e) => {
                  setReply(e.target.value);
                }}
              />
              <Button
                className="btn-material"
                size="small"
                variant="contained"
                title="reply"
                style={{ margin: "5px" }}
                type="submit"
                onClick={() => {
                  onCreateReply(props?.comment, reply);
                  setIsReply(!isReply);
                  setReply("");
                }}
              >
                Comment
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
