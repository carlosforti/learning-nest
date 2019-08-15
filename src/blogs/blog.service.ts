import { Injectable } from '@nestjs/common';
import uuid = require('uuid');
import { IBlog } from './blog.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, AdvancedConsoleLogger } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogsService {
    private blogs: IBlog[] = [];

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
        if (blog.id === undefined) {
            blog.id = uuid();
        }
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
