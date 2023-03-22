import { Button, TextField } from "@mui/material";
import iconRemove from "../../Model/Image/remove.png";
import iconUpdate from "../../Model/Image/update.png";
import { useState } from "react";
import { CommentData } from "../../../App";

export default function Reply(props: any) {
  const [reply, setReply] = useState(props.reply as CommentData);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateReplyText, setUpdateReplyText] = useState(reply.text);

  if (isUpdate) {
    return (
      <li className="reply-content">
        <form
          className="form_comment"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            className="input_comment"
            placeholder="Join the conversation.."
            value={updateReplyText}
            onChange={(e) => {
              setUpdateReplyText(e.target.value);
            }}
          />
          <Button
            className="btn-material"
            variant="contained"
            title="reply"
            style={{ margin: "5px" }}
            type="submit"
            onClick={async () => {
              await props.onUpdateReply(reply.id, updateReplyText);
              setUpdateReplyText("")
              setIsUpdate(!isUpdate);
            }}
          >
            Save
          </Button>
        </form>
      </li>
    );
  }

  return (
    <li className="reply-content">
      <div className="content-comment">{reply.text}</div>
      <div>
        <Button
          variant="outlined"
          style={{ margin: "5px" }}
          className="btn-reply-comment"
          type="button"
          title="update"
          onClick={() => {
            setIsUpdate(!isUpdate);
          }}
        >
          <img src={iconUpdate} alt="" />
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "5px" }}
          className="btn-reply-comment"
          type="button"
          title="delete"
          onClick={() => {
            props.onDeleteReply(reply.id);
          }}
        >
          <img src={iconRemove} alt="" />
        </Button>
      </div>
    </li>
  );
}
