import { IComment } from './comment.interface';
import { Post } from '../posts/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// Identifica a classe como uma entidade do banco de dados
@Entity('comment')
export class Comment implements IComment {
    // Define a coluna como sendo identidade, sendo gerada automáticamente pelo banco de dados
    @PrimaryGeneratedColumn()
    public id: number;

    // Define o relacionamento entre comentário e post,
    // sendo que um post pode ter N comentários
    @ManyToOne(() => Post, (post) => post.comments)
    public post: Post;

    // Define como uma coluna de banco de dados, com tamanho 200
    @Column({ length: 200 })
    public name: string;

    // Define como uma coluna de banco de dados, com tamanho 200
    @Column({ length: 200 })
    public email: string;

    // Define como uma coluna de banco de dados, sem tamanho definido
    @Column()
    public text: string;

    // Define como uma coluna de banco de dados que gravará a data/hora que o registro foi criado
    @CreateDateColumn()
    public createdAt: Date;

    // Define como uma coluna de banco de dados que gravará a data/hora da última alteração do registro
    @UpdateDateColumn()
    public updatedAt: Date;
}
