import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPost } from './post.interface';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly repository: Repository<Post>) {
    }

    public async getAll(): Promise<IPost[]> {
        return await this.repository.find();
    }

    public async get(id: number): Promise<IPost> {
        return await this.repository.findOne(id);
    }

    public async create(entity: IPost): Promise<number> {
        return await this.repository.insert(entity)
            .then(f => {
                return f.identifiers[0] as any as number;
            }, () => {
                return 0;
            });
    }
    public async update(id: number, entity: IPost): Promise<boolean> {
        if (id !== entity.id) {
            return false;
        }

        await this.repository.update(id, entity);
        return true;
    }

    public async delete(id: number): Promise<boolean> {
        return await this.repository.delete(id)
            .then(f => {
                console.log(f);
                return true;
            }, err => {
                console.log(err);
                return false;
            });
    }
}
