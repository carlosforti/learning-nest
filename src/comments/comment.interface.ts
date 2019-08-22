import { IBaseEntity } from 'src/base/base.interface';
import { Post } from '../posts/post.entity';

export interface IComment extends IBaseEntity  {
    name: string;
    email: string;
    text: string;
    post: Post;
}
