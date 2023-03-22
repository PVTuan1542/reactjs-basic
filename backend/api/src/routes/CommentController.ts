import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import CommentService, {
  IComment,
  ICommentUpdate,
} from "@src/services/CommentService";
import { IReq, IRes } from "./types/express/misc";

/**
 * Get all users.
 */

async function getAll(_: IReq, res: IRes) {
  const comments = await CommentService.getComments();

  return res.status(HttpStatusCodes.OK).json({ comments });
}

async function addComment(req: IReq<IComment>, res: IRes) {
  const comment = await CommentService.addComment(req.body);

  // Return
  return res.status(HttpStatusCodes.OK).json(comment);
}

async function updateComment(req: IReq<ICommentUpdate>, res: IRes) {
  const comment = req.body;
  const id = req.params.id;

  const oldComment = (await CommentService.getOneComment(
    id
  )) as unknown as IComment;

  if (!oldComment) return res.status(HttpStatusCodes.NOT_FOUND).end();

  await CommentService.updateComment({ ...oldComment, ...comment });

  // Return
  return res.status(HttpStatusCodes.OK).end();
}

async function deleteComment(req: IReq, res: IRes) {
  const id = req.params.id;

  const oldComment = (await CommentService.getOneComment(
    id
  )) as unknown as IComment;

  if (!oldComment) return res.status(HttpStatusCodes.NOT_FOUND).end();

  await CommentService.deleteComment(id);

  // Return
  return res.status(HttpStatusCodes.OK).end();
}

async function getCommentByPostId(req: IReq, res: IRes) {
  const id = req.params.id;

  const comments = await CommentService.getCommentByPostId(id);

  // Return
  return res.status(HttpStatusCodes.OK).json({ comments });
}

async function getCommentByParentId(req: IReq, res: IRes) {
  const id = req.params.id;

  const comments = await CommentService.getCommentByParentId(id);

  // Return
  return res.status(HttpStatusCodes.OK).json({ comments });
}

export default {
  getAll,
  addComment,
  updateComment,
  deleteComment,
  getCommentByPostId,
  getCommentByParentId,
} as const;
