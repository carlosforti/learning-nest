import { Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';
import { IComment } from './comment.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comment)
    private readonly repository: Repository<Comment>) {
    }

    public async getAll(): Promise<IComment[]> {
        return this.repository.find();
    }

    public async get(id: number): Promise<IComment> {
        return this.repository.findOne(id);
    }

    public async create(entity: IComment): Promise<number> {
        return await this.repository.insert(entity)
            .then(f => {
                return f.identifiers[0] as any as number;
            }, err => {
                return 0;
            });
    }

    public async update(id: number, entity: IComment): Promise<boolean> {
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
