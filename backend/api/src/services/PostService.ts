import pool from "@src/models/database/connect";
// import con from "@src/models/database/connect";
import { v4 as uuidv4 } from "uuid";

export interface IPost {
  id: number;
  desc: string;
  photo: string;
  user_id: string;
  like: number;
  comment: number;
}

export interface IPostUpdate {
  desc: string;
  photo: string;
  like: number;
  comment: number;
}

//Function get all posts
async function getPosts() {
  try {
    const sql = 'SELECT * FROM posts ORDER BY "created_at" asc';
    const response = await pool.query(sql);

    return response.rows;
  } catch (error) {
    console.error(error);
  }
}

//Function add post
async function addPost(data: IPost) {
  try {
    const id = uuidv4();
    const sql =
      'INSERT INTO posts("id", "desc","photo","user_id","like","comment") VALUES ($1, $2, $3, $4, $5, $6)';

    const post = [
      id,
      data.desc,
      data.photo,
      data.user_id,
      data.like,
      data.comment,
    ];

    await pool.query(sql, post);

    return { ...data, id };
  } catch (error) {
    console.error(error);
  }
}

//Function get one post
async function getOnePost(id: string) {
  try {
    const sql = 'SELECT * FROM posts WHERE "id"=$1';

    const response = await pool.query(sql, [id]);

    return response.rows[0];
  } catch (error) {
    console.error(error);
  }
}

//Function update post
async function updatePost(data: IPost) {
  try {
    const sql = `UPDATE "posts" SET "desc" = $1, "photo" = $2, "like" = $3, "comment" = $4 WHERE "id" = $5`;
    const post = [data.desc, data.photo, data.like, data.comment, data.id];

    const a = await pool.query(sql, post);

    return true;
  } catch (error) {
    console.error(error);
  }
}

//Function delete post
async function deletePost(id: string) {
  try {
    const sql = 'DELETE FROM "posts" WHERE "id" = $1';
    await pool.query(sql, [id]);

    return true;
  } catch (error) {
    console.error(error);
  }
}

//Function get all posts
async function getPostsLoadMore(limit: string, offset: string) {
  try {
    const sql = 'SELECT * FROM posts ORDER BY "created_at" asc LIMIT $1 offset $2';
    const response = await pool.query(sql,[limit, offset]);

    return response.rows;
  } catch (error) {
    console.error(error);
  }
}

export default { getPosts, addPost, getOnePost, updatePost, deletePost, getPostsLoadMore };
