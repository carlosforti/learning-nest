import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { Blog } from './blog';
import * as uuid from 'uuid/v4';

@Controller('blogs')
export class BlogsController {
    // Aqui armazeno todos os blogs cadastrados
    private blogs: Blog[] = [];

    // Adiciono um novo blog
    @Post()
    // @Body significa que vou pegar o objeto no corpo da requisição
    public create(@Body() blog: Blog): string {
        if (blog.id === undefined) {
            blog.id = uuid();
        }
        this.blogs.push(blog);
        return blog.id;
    }

    // Retorno todos os blogs
    @Get()
    public getAll(): Blog[] {
        return this.blogs;
    }

    // Retorno o blog com o nome especificado
    @Get(':id')
    // @Param é o parâmetro passado no decorator do Get
    public get(@Param('id') id: string): Blog {
        const blog = this.blogs.find(p => p.id === id);
        return blog;
    }

    // Atualizo um blog existente
    @Put(':id')
    // Aqui é enviado o nome do blog sendo alterado, e também o objeto com as alterações
    public update(@Param('id') id: string, @Body() blog: Blog) {
        // Como estou considerando o nome como 'chave primária', valido por ele se o enviado é
        // igual ao que está sendo alterado
        if (id !== blog.id) {
            return;
        }

        // Aqui vou fazer o processo mais simples, remover o item do array e adicionar novamente
        this.delete(id);
        this.create(blog);
    }

    // Excluo um blog da lista
    @Delete(':id')
    public delete(@Param('id') id: string) {
        const blog = this.get(id);
        const pos = this.blogs.indexOf(blog);
        this.blogs.splice(pos, 1);
    }
}
