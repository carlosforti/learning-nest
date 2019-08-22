import { IBlog } from './blog.interface';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity('blog')
export class Blog implements IBlog {
     @PrimaryGeneratedColumn()
     public id: number;

     @Column({ length: 100 })
     public name: string;

     @Column({ length: 100 })
     public author: string;

     @Column({ length: 500 })
     public url: string;

     @CreateDateColumn()
     public createdAt: Date;

     @UpdateDateColumn()
     public updatedAt: Date;

     @OneToMany(() => Post, (post) => post.blog)
     public posts: Post[];
}
