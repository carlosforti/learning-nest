import { IBlog } from './blog.interface';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity';

// Identifica a classe como uma entidade do banco de dados
@Entity('blog')
export class Blog implements IBlog {
     // Define a coluna como sendo identidade, sendo gerada automáticamente pelo banco de dados
     @PrimaryGeneratedColumn()
     public id: number;

     // Define como uma coluna de banco de dados, com tamanho 100
     @Column({ length: 100 })
     public name: string;

     // Define como uma coluna de banco de dados, com tamanho 100
     @Column({ length: 100 })
     public author: string;

     // Define como uma coluna de banco de dados, com tamanho 500
     @Column({ length: 500 })
     public url: string;

     // Define como uma coluna de banco de dados que gravará a data/hora que o registro foi criado
     @CreateDateColumn()
     public createdAt: Date;

     // Define como uma coluna de banco de dados que gravará a data/hora da última alteração do registro
     @UpdateDateColumn()
     public updatedAt: Date;

     // Define um relacionamento de um-para-muitos, onde um blog pode ter N posts
     @OneToMany(() => Post, (post) => post.blog)
     public posts: Post[];
}
