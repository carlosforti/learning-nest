import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { Blog } from '../models/blog';
import { BlogService } from 'src/services/blog/blog.service';

@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogService: BlogService) {
    }

    // Adiciono um novo blog
    @Post()
    // @Body significa que vou pegar o objeto no corpo da requisição
    public create(@Body() blog: Blog): string {
        return this.blogService.create(blog);
    }

    // Retorno todos os blogs
    @Get()
    public getAll(): Blog[] {
        return this.blogService.getAll();
    }

    // Retorno o blog com o nome especificado
    @Get(':id')
    // @Param é o parâmetro passado no decorator do Get
    public get(@Param('id') id: string): Blog {
        return this.blogService.get(id);
    }

    // Atualizo um blog existente
    @Put(':id')
    // Aqui é enviado o nome do blog sendo alterado, e também o objeto com as alterações
    public update(@Param('id') id: string, @Body() blog: Blog) {
        this.blogService.update(id, blog);
    }

    // Excluo um blog da lista
    @Delete(':id')
    public delete(@Param('id') id: string) {
        this.blogService.delete(id);
    }
}
