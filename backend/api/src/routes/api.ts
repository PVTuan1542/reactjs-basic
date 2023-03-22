import { Router } from "express";
import jetValidator from "jet-validator";
import Paths from "./constants/Paths";
import PostController from "./PostController";
import CommentController from "./CommentController";

// **** Variables **** //

const apiRouter = Router()

// ** Add PostRouter ** //
const postRouter = Router();

// Get all posts
postRouter.get(Paths.Posts.Get, PostController.getAll);

// Get posts load more
postRouter.get(Paths.Posts.GetLoadMore, PostController.getPostsLoadMore);

// Add a post
postRouter.post(Paths.Posts.Add, PostController.addPost);

// update a post
postRouter.post(Paths.Posts.Update, PostController.updatePost);

// delete a post
postRouter.delete(Paths.Posts.Delete, PostController.deletePost);

// Add UserRouter
apiRouter.use(Paths.Posts.Base, postRouter);

// ** Add CommentsRouter ** //
const commentRouter = Router();

// Get all comments
commentRouter.get(Paths.Comments.Get, CommentController.getAll);

// Add a comment
commentRouter.post(Paths.Comments.Add, CommentController.addComment);

// update a comment
commentRouter.post(Paths.Comments.Update, CommentController.updateComment);

// delete a comment
commentRouter.delete(Paths.Comments.Delete, CommentController.deleteComment);

// get comment by post id
commentRouter.get(Paths.Comments.GetByPostId, CommentController.getCommentByPostId);

// get comment by parent id
commentRouter.get(
  Paths.Comments.GetByParentId,
  CommentController.getCommentByParentId
);

// Add UserRouter
apiRouter.use(Paths.Comments.Base, commentRouter);

// **** Export default **** //

export default apiRouter;
