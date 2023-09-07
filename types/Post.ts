import { Comment } from "./Comment";

export type Post = {
    id: string;
    content: string;
    createdAt: string;
    comments: Comment[];
    likes: number;
    user_name: string;
};