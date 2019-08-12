import { IBaseEntity } from '../base/base.interface';

export interface IBlog extends IBaseEntity {
     name: string;
     author: string;
     url: string;
}
