import { Post } from "./post.model";

export class User{
    id!: string;
    role!: string;
    name!: string;
    posts?: Post[];
}