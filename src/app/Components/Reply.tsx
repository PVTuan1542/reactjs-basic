import { Button, TextField } from "@mui/material";
import { useState } from "react";
import iconRemove from "../Model/Image/remove.png";
import iconUpdate from "../Model/Image/update.png";

function Reply(props: any) {
  const [flag, setFlag] = useState(-1);
  const [updateReplyText, setUpdateReplyText] = useState(props.reply.comment);

  function handleDeleteReply(idReply: number) {
    const newReplies: any = [];
    props.comment.replies.forEach((element: any) => {
      if (idReply !== element.id) {
        newReplies.push(element);
      }
    });

    props.handleUpdateComment(props.comment.id, {
      ...props.comment,
      replies: newReplies,
    });
  }

  function handleUpdateReply(idReply: number, reply: any) {
    const newReplies = props.comment.replies.map((element: any) => {
      if (idReply === element.id) {
        return reply;
      } else {
        return element;
      }
    });

    props.handleUpdateComment(props.comment.id, {
      ...props.comment,
      replies: newReplies,
    });
  }

  if (props.reply.id === props.flagUpdateReply) {
    return (
      <li key={props.comment.id}>
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
            onClick={() => {
              handleUpdateReply(flag, {
                ...props.reply,
                comment: updateReplyText,
              });
              setFlag(-1);
              props.setFlagUpdateReply(-1);
              setUpdateReplyText("");
            }}
          >
            Save
          </Button>
        </form>
      </li>
    );
  }

  return (
    <li key={props.reply.id} className="action-comment">
      <div className="content-comment">{props.reply.comment}</div>
      <div>
        <Button
          variant="outlined"
          style={{ margin: "5px" }}
          className="btn-reply-comment"
          type="button"
          title="update"
          onClick={() => {
            setFlag(props.reply.id);
            props.setFlagUpdateReply(props.reply.id);
            setUpdateReplyText(props.reply.comment);
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
            handleDeleteReply(props.reply.id);
          }}
        >
          <img src={iconRemove} alt="" />
        </Button>
      </div>
    </li>
  );
}

export default Reply;
