import { IPost } from './post.interface';
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Blog } from '../blogs/blog.entity';
import { Comment } from '../comments/comment.entity';

@Entity('post')
export class Post implements IPost {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Blog, (blog) => blog.posts)
    public blog: Blog;

    @Column({ length: 200 })
    public title: string;

    @Column()
    public date: Date;

    @Column()
    public content: string;

    @Column()
    public isDraft: boolean;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @OneToMany(() => Comment, (comment) => comment.post)
    public comments: Comment[];
}
