import { IBaseEntity } from 'src/base/base.interface';

export interface IPost extends IBaseEntity {
    title: string;
    date: Date;
    content: string;
    isDraft: boolean;
}
