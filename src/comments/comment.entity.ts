import { IComment } from './comment.interface';
import { Post } from '../posts/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('comment')
export class Comment implements IComment {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 200 })
    public name: string;

    @Column({ length: 200 })
    public email: string;

    @Column()
    public text: string;

    @OneToMany(() => Post, (post) => post.comments)
    public post: Post;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
