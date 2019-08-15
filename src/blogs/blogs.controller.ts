import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { IBlog } from './blog.interface';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
    constructor(private readonly service: BlogsService) {
    }

    // Adiciono um novo blog
    @Post()
    // @Body significa que vou pegar o objeto no corpo da requisição
    public async create(@Body() blog: IBlog): Promise<number> {
        return await this.service.create(blog);
    }

    // Retorno todos os blogs
    @Get()
    public async getAll(): Promise<IBlog[]> {
        return await this.service.getAll();
    }

    // Retorno o blog com o id especificado
    @Get(':id')
    // @Param é o parâmetro passado no decorator do Get
    public async get(@Param('id') id: number): Promise<IBlog> {
        const result = await this.service.get(id);
        if (!result) {
            throw new HttpException('Blog não encontrado', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    // Atualizo um blog existente
    @Put(':id')
    // Aqui é enviado o nome do blog sendo alterado, e também o objeto com as alterações
    public async update(@Param('id') id: number, @Body() blog: IBlog): Promise<boolean | void> {
        return this.service.update(id, blog);
    }

    // Excluo um blog da lista
    @Delete(':id')
    public async delete(@Param('id') id: number): Promise<boolean | void> {
        return this.service.delete(id);
    }
}
