import { Post } from "./post.model";

export class User{
    id!: string;
    email: string = '';
    role!: string;
    name: string='';
    posts?: Post[];
}