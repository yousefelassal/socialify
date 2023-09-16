import { Comment } from "./Comment";
import { User } from "./User";

export type Post = {
    id: string;
    content: string;
    createdAt: string;
    comments: Comment[];
    likes: number;
    liked_by: User[];
    user: User;
};