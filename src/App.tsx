import "./App.css";
import { Routes, Route } from "react-router-dom";
import ListPost from "./app/ListPost";
import NewPost from "./app/NewPost";
import Profile from "./app/Components/Profile/Profile";
import { Users } from "./app/Model/data";
import { useState } from "react";
export interface PostData {
  id: number;
  desc: string;
  photo: string;
  date: string;
  user_id: number;
  like: number;
  comment: number;
}

export interface CommentData {
  id: number;
  user_id: number;
  post_id: number;
  parent_id: number;
  like: number;
  text: string;
}

export interface UserData {
  id: number;
  profilePicture: string;
  username: string;
  address: string;
}

function App() {
  const [users, setUsers] = useState<UserData[]>(Users);

  return (
    <Routes>
      <Route
        path="/"
        element={<NewPost />}
      ></Route>
      <Route
        path="/page"
        element={<ListPost users={users}/>}
      ></Route>
      <Route path="/profile" element={<Profile />}></Route>
    </Routes>
  );
}

export default App;
