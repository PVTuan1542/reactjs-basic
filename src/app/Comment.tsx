import { useEffect, useState } from "react";
import Reply from "./Components/Reply";
import { Button, TextField } from "@mui/material";

function Comment(props: any) {
  const [index, setIndex] = useState(0);
  const [indexReply, setIndexReply] = useState(0);
  const [flag, setFlag] = useState("");
  const [updateCommentText, setUpdateCommentText] = useState("");
  const [comment, setCommentText] = useState("");
  const [reply, setReply] = useState("");
  const [flagReply, setFlagReply] = useState(-1);
  const [flagUpdateReply, setFlagUpdateReply] = useState(-1);

  function handleComment() {
    setCommentText("");
    if (comment) {
      props.comments.push({
        id: index,
        comment: comment,
        replies: [],
      });
    }
  }

  function handleUpdateComment(id: number, comment: any) {
    const newComments = props.comments.map((element: any) => {
      if (id === element.id) {
        return comment;
      } else {
        return element;
      }
    });

    props.setComments(newComments);
  }

  function handleDeleteComment(id: number) {
    const newComments: any = [];
    props.comments.forEach((element: any) => {
      if (id !== element.id) {
        newComments.push(element);
      }
    });

    props.setComments(newComments);
  }

  function updateComment(comment: any, key: any) {
    if (comment.id === flag) {
      return (
        <li key={key}>
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
              value={updateCommentText}
              onChange={(e) => {
                setUpdateCommentText(e.target.value);
              }}
            />
            <Button
              className="btn-material"
              variant="contained"
              title="delete"
              style={{ margin: "5px" }}
              type="submit"
              onClick={() => {
                handleUpdateComment(comment.id, {
                  ...comment,
                  comment: updateCommentText,
                });
                setFlag("");
                setFlagReply(-1);
                setUpdateCommentText("");
              }}
            >
              Save
            </Button>
          </form>
        </li>
      );
    }

    return (
      <div key={key}>
        <div>
          <li className="action-comment">
            <div className="content-comment">{comment.comment}</div>
            <div>
              <Button
                className="btn-material"
                variant="contained"
                type="button"
                title="update"
                style={{ margin: "5px" }}
                onClick={() => {
                  setFlag(comment.id);
                  setUpdateCommentText(comment.comment);
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
                onClick={() => {
                  handleDeleteComment(comment.id);
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
                  setFlagReply(comment.id);
                }}
              >
                Reply
              </Button>
            </div>
          </li>
        </div>
        <ul className="list-comment">
          {comment?.replies.length
            ? comment?.replies.map((reply: any, key: any) => {
                return (
                  <Reply
                    reply={reply}
                    key={key}
                    comment={comment}
                    handleUpdateComment={handleUpdateComment}
                    flagUpdateReply={flagUpdateReply}
                    setFlagUpdateReply={setFlagUpdateReply}
                    setTest={props.setTest}
                  />
                );
              })
            : null}
        </ul>
        <div>
          {comment.id === flagReply && (
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
                  handleReply(flagReply, reply);
                  setFlagReply(-1);
                }}
              >
                Comment
              </Button>
            </form>
          )}
        </div>
      </div>
    );
  }

  function handleReply(id: number, reply: string) {
    setReply("");
    if (reply) {
      props?.comments.map((element: any) => {
        if (element.id === id) {
          element.replies?.push({
            id: indexReply,
            comment: reply,
          });
        }

        return element;
      });

      setIndexReply((indexReply) => indexReply + 1);
    }
  }

  return (
    <div>
      <ul>
        <div className="user_avatar">
          <img
            src="https://s3.amazonaws.com/uifaces/faces/twitter/BillSKenney/73.jpg"
            alt=""
          />
        </div>
        <form
          className="form_comment"
          onSubmit={(e) => {
            e.preventDefault();
            comment && handleComment();
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
            onClick={() => {
              setIndex((index) => index + 1);
            }}
          >
            Comment
          </Button>
        </form>
      </ul>
      <ul className="list-comment">
        {props.comments.map((comment: any, key: any) => {
          return updateComment(comment, key);
        })}
      </ul>
    </div>
  );
}

export default Comment;
