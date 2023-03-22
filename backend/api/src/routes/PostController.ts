import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import con from "@src/models/database/connect";
import PostService, { IPost, IPostUpdate } from "@src/services/PostService";
import { IReq, IRes } from "./types/express/misc";

/**
 * Get all users.
 */

async function getAll(_: IReq, res: IRes) {
  const posts = await PostService.getPosts();

  return res.status(HttpStatusCodes.OK).json({ posts });
}

async function addPost(req: IReq<IPost>, res: IRes) {
  const post = await PostService.addPost(req.body);

  // Return
  return res.status(HttpStatusCodes.OK).json(post);
}

async function updatePost(req: IReq<IPostUpdate>, res: IRes) {
  const post = req.body;
  const id = req.params.id;

  const oldPost = (await PostService.getOnePost(id)) as IPost;

  if (!oldPost) return res.status(HttpStatusCodes.NOT_FOUND).end();

  await PostService.updatePost({ ...oldPost, ...post });

  // Return
  return res.status(HttpStatusCodes.OK).end();
}

async function deletePost(req: IReq, res: IRes) {
  const id = req.params.id;

  const oldPost = (await PostService.getOnePost(id)) as IPost;

  if (!oldPost) return res.status(HttpStatusCodes.NOT_FOUND).end();

  await PostService.deletePost(id);

  // Return
  return res.status(HttpStatusCodes.OK).end();
}

async function getPostsLoadMore(req: IReq, res: IRes) {

  const limit = req.query.limit;
  const offset = req.query.offset;

  const posts = await PostService.getPostsLoadMore(limit as any, offset as any);

  return res.status(HttpStatusCodes.OK).json({ posts });
}


export default {
  getAll,
  addPost,
  updatePost,
  deletePost,
  getPostsLoadMore
} as const;
