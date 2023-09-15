import { Comment } from "./Comment";
import { User } from "./User";

export type Post = {
    id: string;
    content: string;
    createdAt: string;
    comments: Comment[];
    likes: number;
    user: User;
};