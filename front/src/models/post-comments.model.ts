import { Post } from "./post.model";

export class PostComments{
    id!: string;
    userId!: string;
    postId?: string;
    content!: string;
    post?: Post;
}