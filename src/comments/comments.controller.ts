import { Controller, Post, Body, Get, Param, HttpException, HttpStatus, Put, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { IComment } from './comment.interface';

@Controller('comments')
export class CommentsController {
    constructor(private readonly service: CommentsService) {
    }

    // Adiciono um novo Comment
    @Post()
    // @Body significa que vou pegar o objeto no corpo da requisição
    public async create(@Body() Comment: IComment): Promise<number> {
        return await this.service.create(Comment);
    }

    // Retorno todos os Comments
    @Get()
    public async getAll(): Promise<IComment[]> {
        return await this.service.getAll();
    }

    // Retorno o Comment com o id especificado
    @Get(':id')
    // @Param é o parâmetro passado no decorator do Get
    public async get(@Param('id') id: number): Promise<IComment> {
        const result = await this.service.get(id);
        if (!result) {
            throw new HttpException('Comment não encontrado', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    // Atualizo um Comment existente
    @Put(':id')
    // Aqui é enviado o nome do Comment sendo alterado, e também o objeto com as alterações
    public async update(@Param('id') id: number, @Body() Comment: IComment): Promise<boolean | void> {
        return this.service.update(id, Comment);
    }

    // Excluo um Comment da lista
    @Delete(':id')
    public async delete(@Param('id') id: number): Promise<boolean | void> {
        return this.service.delete(id);
    }
}
