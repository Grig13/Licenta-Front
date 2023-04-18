import { PostComments } from "./post-comments.model";

export class Post{
    id!: string;
    postContent!: string;
    postImage?: string;
    userId!: string;
    timelineId?: string;
    comments?: PostComments[];
}