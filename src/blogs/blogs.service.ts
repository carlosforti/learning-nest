import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogsService {
    constructor(@InjectRepository(Blog)
    private readonly repository: Repository<Blog>) {
    }

    public async getAll(): Promise<Blog[]> {
        return this.repository.find();
    }

    public async get(id: number): Promise<Blog> {
        return this.repository.findOne(id);
    }

    public async create(blog: Blog): Promise<number> {
        return await this.repository.insert(blog)
            .then(f => {
                return f.identifiers[0] as any as number;
            }, err => {
                return 0;
            });
    }

    public async update(id: number, blog: Blog): Promise<boolean> {
        if (id !== blog.id) {
            return false;
        }

        await this.repository.update(id, blog);
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
