import pool from "@src/models/database/connect";
import { v4 as uuidv4 } from "uuid";

export interface IComment {
  id: number;
  user_id: number;
  post_id: number;
  parent_id: number;
  like: number;
  text: string;
}

export interface ICommentUpdate {
  like: number;
  text: string;
}

//Function get all Comments
async function getComments() {
  try {
    const sql = "SELECT * FROM comments";
    const response = await pool.query(sql);

    return response.rows;
  } catch (error) {
    console.error(error);
  }
}

//Function add Comment
async function addComment(data: IComment) {
  try {
    const id = uuidv4();
    let sql =
      'INSERT INTO comments("id","user_id","post_id","parent_id","like","text") VALUES ($1, $2, $3, $4, $5, $6)';

    const comment = [
      id,
      data?.user_id,
      data?.post_id,
      data?.parent_id,
      data?.like,
      data?.text,
    ];

    const response = await pool.query(sql, comment);

    return { ...data, id };
  } catch (error) {
    console.error(error);
  }
}

//Function get one Comment
async function getOneComment(id: string) {
  try {
    const sql =
      'SELECT * FROM comments WHERE "id"=$1 ORDER BY "created_at" asc';

    const response = await pool.query(sql, [id]);

    return response.rows[0];
  } catch (error) {
    console.error(error);
  }
}

//Function update Comment
async function updateComment(data: IComment) {
  try {
    const sql = `UPDATE "comments" SET "like" = $1, "text" = $2 WHERE "id" = $3`;
    const comment = [data.like, data.text, data.id];
    await pool.query(sql, comment);

    return true;
  } catch (error) {
    console.error(error);
    return false
  }
}

//Function delete Comment
async function deleteComment(id: string) {
  try {
    const sql = 'DELETE FROM "comments" WHERE "id" = $1';
    const response = await pool.query(sql, [id]);

    return true
  } catch (error) {
    console.error(error);
  }
}
//Function Comment by postId
async function getCommentByPostId(id: string) {
  try {
    const sql =
      'SELECT * FROM comments WHERE "post_id"=$1 AND "parent_id" is null ORDER BY "created_at" asc';

    const response = await pool.query(sql, [id]);

    return response.rows;
  } catch (error) {
    console.error(error);
  }
}

//Function Comment by parenId
async function getCommentByParentId(id: string) {
  try {
    const sql =
      'SELECT * FROM comments WHERE "parent_id"=$1 ORDER BY "created_at" asc';

    const response = await pool.query(sql, [id]);

    return response.rows;
  } catch (error) {
    console.error(error);
  }
}

export default {
  getComments,
  addComment,
  getOneComment,
  updateComment,
  deleteComment,
  getCommentByPostId,
  getCommentByParentId,
};
