import "./App.css";
import { Routes, Route } from "react-router-dom";
import ListPost from "./app/ListPost";
import NewPost from "./app/NewPost";
import Profile from "./app/Components/Profile/Profile";
import { Posts, Users } from "./app/Model/data";
import { useEffect, useState } from "react";

export interface PostData {
  id: number;
  desc: string;
  photo: string;
  date: string;
  userId: number;
  like: number;
  comment: number;
}

export interface UserData {
  id: number;
  profilePicture: string;
  username: string;
  address: string;
}

function App() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [users, setUsers] = useState<UserData[]>(Users);

  useEffect(() => {
    setPosts(Posts);

  }, []);


  return (
    <Routes>
      <Route
        path="/"
        element={<NewPost posts={posts} setPosts={setPosts} />}
      ></Route>
      <Route
        path="/page"
        element={<ListPost users={users} posts={posts} setPosts={setPosts} />}
      ></Route>
      <Route path="/profile" element={<Profile />}></Route>
    </Routes>
  );
}

export default App;
