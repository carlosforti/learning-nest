import { Injectable } from '@nestjs/common';
import { Blog } from 'src/models/blog';
import uuid = require('uuid');

@Injectable()
export class BlogService {
	private blogs: Blog[] = [];

	public getAll(): Blog[] {
		return this.blogs;
	}

	public get(id: string): Blog {
		const blog = this.blogs.find(p => p.id === id);
		return blog;
	}

	public create(blog: Blog): string {
		try {
			if (blog.id === undefined) {
				blog.id = uuid();
			}
			this.blogs.push(blog);
			return blog.id;
		} catch {
			return "";
		}
	}

	public update(id: string, blog: Blog): boolean {
		if (id !== blog.id) {
			return false;
		}

		// Aqui vou fazer o processo mais simples, remover o item do array e adicionar novamente
		this.delete(id);
		this.create(blog);
		return true;
	}

	public delete(id: string) {
		const blog = this.get(id);
		const pos = this.blogs.indexOf(blog);
		this.blogs.splice(pos, 1);
	}
}
