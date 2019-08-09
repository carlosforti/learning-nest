import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Blog } from './blog';
import { BlogService } from './blog.service';

@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogService: BlogService) {
    }

    // Adiciono um novo blog
    @Post()
    // @Body significa que vou pegar o objeto no corpo da requisição
    public create(@Body() blog: Blog): string {
        const result = this.blogService.create(blog);

        if (result === '') {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    // Retorno todos os blogs
    @Get()
    public getAll(): Blog[] {
        return this.blogService.getAll();
        // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
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
