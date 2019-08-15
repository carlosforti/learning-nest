import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { IPost } from './post.interface';

@Controller('posts')
export class PostsController {
    constructor(private readonly service: PostsService) {
    }

    // Adiciono um novo post
    @Post()
    // @Body significa que vou pegar o objeto no corpo da requisição
    public async create(@Body() post: IPost): Promise<number> {
        return await this.service.create(post);
    }

    // Retorno todos os posts
    @Get()
    public async getAll(): Promise<IPost[]> {
        return await this.service.getAll();
    }

    // Retorno o post com o id especificado
    @Get(':id')
    // @Param é o parâmetro passado no decorator do Get
    public async get(@Param('id') id: number): Promise<IPost> {
        const result = await this.service.get(id);
        if (!result) {
            throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    // Atualizo um post existente
    @Put(':id')
    // Aqui é enviado o nome do blog sendo alterado, e também o objeto com as alterações
    public async update(@Param('id') id: number, @Body() post: IPost): Promise<boolean | void> {
        return this.service.update(id, post);
    }

    // Excluo um blog da lista
    @Delete(':id')
    public async delete(@Param('id') id: number): Promise<boolean | void> {
        return this.service.delete(id);
    }
}
