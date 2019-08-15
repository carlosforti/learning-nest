import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogsService {
    constructor(@InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>) {
    }

    public getAll(): Promise<Blog[]> {
        return this.blogRepository.find();
    }

    public async get(id: string): Promise<Blog> {
        return this.blogRepository.findOne(id);
    }

    public async create(blog: Blog): Promise<string> {
        return await this.blogRepository.insert(blog)
            .then(f => {
                console.log('Id Gerado: ', f.identifiers[0]);
                return f.identifiers[0] as any as string;
            }, err => {
                console.log(err);
                return '';
            });
    }

    public async update(id: string, blog: Blog): Promise<boolean> {
        if (id !== blog.id) {
            return false;
        }

        await this.blogRepository.update(id, blog);
        return true;
    }

    public async delete(id: string): Promise<boolean> {
        return await this.blogRepository.delete(id)
            .then(f => {
                console.log(f);
                return true;
            }, err => {
                console.log(err);
                return false;
            });
    }
}
