import { IPost } from './post.interface';
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Blog } from '../blogs/blog.entity';
import { Comment } from '../comments/comment.entity';

@Entity('post')
export class Post implements IPost {
    // Define a coluna como sendo identidade, sendo gerada automáticamente pelo banco de dados
    @PrimaryGeneratedColumn()
    public id: number;

    // Define como uma coluna de banco de dados, com tamanho 200
    @Column({ length: 200 })
    public title: string;

    // Define como uma coluna de banco de dados
    @Column()
    public date: Date;

    // Define como uma coluna de banco de dados
    @Column()
    public content: string;

    // Define como uma coluna de banco de dados, com tamanho 200
    @Column()
    public isDraft: boolean;

    // Define como uma coluna de banco de dados que gravará a data/hora que o registro foi criado
    @CreateDateColumn()
    public createdAt: Date;

    // Define como uma coluna de banco de dados que gravará a data/hora da última alteração do registro
    @UpdateDateColumn()
    public updatedAt: Date;

    // Define o relacionamento de muitos para um,
    // ou seja, um blog pode ter N posts
    @ManyToOne(() => Blog, (blog) => blog.posts)
    public blog: Blog;

    // Define o relacionamento de um para muitos nos comentários,
    // ou seja, um post pode ter N comments
    @OneToMany(() => Comment, (comment) => comment.post)
    public comments: Comment[];
}
