import { createContext } from "react";
export const PostContext = createContext({id: 1, desc: 'tot', photo: '',date: '', userId: 1, like: 3, comment: 2});

export const UsersContext = createContext({id: 1, profilePicture: 'tot', username: ''});