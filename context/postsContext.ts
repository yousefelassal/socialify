import { createContext } from "react";

export const PostsContext = createContext({
    posts: [] || null || undefined || {} || 0,
    setPosts: (posts: any) => {},
});