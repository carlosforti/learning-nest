import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { IBlog } from './blog.interface';
import { BlogsService } from './blogs.service';
import { Blog } from './blog.entity';

@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogService: BlogsService) {
    }

    // Adiciono um novo blog
    @Post()
    // @Body significa que vou pegar o objeto no corpo da requisição
    public async create(@Body() blog: IBlog): Promise<string> {
        return await this.blogService.create(blog);
    }

    // Retorno todos os blogs
    @Get()
    public async getAll(): Promise<Blog[]> {
        return await this.blogService.getAll();
    }

    // Retorno o blog com o nome especificado
    @Get(':id')
    // @Param é o parâmetro passado no decorator do Get
    public async get(@Param('id') id: string): Promise<Blog> {
        const result = await this.blogService.get(id);
        if (!result) {
            throw new HttpException('Blog não encontrado', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    // Atualizo um blog existente
    @Put(':id')
    // Aqui é enviado o nome do blog sendo alterado, e também o objeto com as alterações
    public async update(@Param('id') id: string, @Body() blog: IBlog): Promise<boolean | void> {
        return this.blogService.update(id, blog);
    }

    // Excluo um blog da lista
    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<boolean | void> {
        return this.blogService.delete(id);
    }
}
