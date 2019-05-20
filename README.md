[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/Naereen/StrapDown.js.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/contributors/)
[![GitHub issues](https://img.shields.io/github/issues/Naereen/StrapDown.js.svg)](https://GitHub.com/Naereen/StrapDown.js/issues/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)


# learning-nest

## Aprendendo Nest Framework

A ideia básica com esse repositório é ser um passo a passo enquanto aprendo [Nest](https://nestjs.com/).

O projeto é o clássico _Blog / Posts / Comments_, apenas para fins de aprendizagem.

**Ferramentas utilizadas**
1. [Visual Studio Code](https://code.visualstudio.com/): Atualmente, considero o melhor editor de textos para desenvolvimento, contando com uma grande variedade de extensões para praticamente qualquer linguagem ou tecnologia.
2. [Postman](https://www.getpostman.com/): Uma excelente ferramenta para testar APIs.
3. [Cmder](https://cmder.net/): Para substituir tanto o Prompt de Comando quanto o PowerShell.

Conforme os estudos, vou atualizando o passo a passo abaixo:

1. **Instalação e criação do projeto**
   
   Para instalar o nest-cli e em seguida criar o projeto, utilizei os seguintes comandos
   ```
   npm install -g @nestjs/cli
   nest new nest101
   ```
   Em seguida entre na pasta criada, instalei todos os pacotes e iniciei o projeto
   ```
   cd nest101
   npm install
   npm run start
   ```
   Para acessar a aplicação, a porta padrão é a 3000.
   Acessando [http://localhost:3000](http://localhost:3000/), será exibido o clássico ```Hello World!```, o que significa que a criação e execução ocorreram com sucesso.

2. **Criação da primeira Controller e Classe**

    Antes de começar a criar a controller, achei interessante instalar um pacote do npm para a geração de GUIDs, que utilizarei como ID's na aplicação. Para isso, executei o seguinte comando:

    ```
    npm i uuid
    ```

    Para proceder com a criação do primeiro controller, utilizadei o seguinte comando
    ```
    nest g controller blogs
    ```
    Com isso, tive o seguinte retorno


    ![alt-text][criacao-controller-blogs]

    Assim, fiquei com a seguinte estrutura de pastas


    ![alt-text][vs-code-controller-blogs]

    Depois, para criar a classe _Blog_, utilizei o comando 

    ```
    ng g class blogs/blog
    ```

    ![alt-text][criacao-classe-blog]

    Com isso, a classe foi criada dentro da pasta blogs.

    ![alt-text][vs-code-classe-blog]

    Em seguida, abri o arquivo _blog.ts_, e criei a classe, conforme o código abaixo:

    ```typescript
    export class Blog {
        public id: string;
        public name: string;
        public author: string;
        public url: string;
    }
    ```

    Com isso tudo pronto, fiz a implementação do controller, de acordo com o código abaixo:

    ```typescript
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
    ```

    Antes de executar, precisei adicionaro o BlogsController na seção _imports_ do arquivo _app.module.ts_.

    ```typescript
    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { BlogsController } from './blogs/blogs.controller';

    @Module({
    imports: [],
    controllers: [AppController, BlogsController],
    providers: [AppService],
    })
    export class AppModule { }
    ```

    Com isso, o projeto está pronto para ser executado. F5 para executar dentro do VS Code, e abri o Postman.
    Fiz algumas requisições, e salvei os prints abaixo.
    
    1. Primeira requisição, um GET sem nenhum item
    ![alt-text][primeiro-get]

    2. Em seguida, um POST para adicionar um item. Foi retornado o GUID gerado como id
    ![alt-text][primeiro-post]

    3. Um GET passando o ID gerado
    ![alt-text][primeiro-get-post]
    
    4. Um PUT para mudar o nome do blog
    ![alt-text][primeiro-put]

    5. Um novo GET, para exibir o nome do blog trocado
    ![alt-text][primeiro-get-put]

    6. Um DELETE, para excluir o blog
    ![alt-text][primeiro-delete]

    7. Um último get, sem o ID, para trazer todos os blogs. No caso, como só cadastrei um e exclui, ficou vazio
    ![alt-text][primeiro-get-delete]

    **Aviso importante:** Nesse primeiro momento, foi utilizado um array na controller para armazenar os dados. Assim que o projeto for parado, esses dados se perderão. Logo teremos uma maneira de fazer a persistência dos dados.

    Com isso, finalizei a primeira versão do controller, da forma mais simples possível. O próximo passo é mover toda a lógica da controller para um service.

[criacao-controller-blogs]: images/01-criando-controller-blogs.png "Resultado da criaçao do controller Blogs"
[vs-code-controller-blogs]: images/02-estrutura-vscode-controller.png "Estrutura de pastas do projeto no VS Code"
[criacao-classe-blog]: images/03-criando-classe-blog.png "Resultado da criação da classe Blog"
[vs-code-classe-blog]: images/04-estrutrura-vscode-blog.png "Estrutura de pastas após a criação da classe Blog"
[primeiro-get]: images/06-get-vazio-primeira-requisicao.png "Primeira requisição GET da API"
[primeiro-post]: images/07-POST-Blog-Teste.png "POST para a criação do primeiro blog"
[primeiro-get-post]: images/09-GET-passando-id.png "GET passando o ID gerado do blog"
[primeiro-put]: images/10-PUT-trocando-nome.png "PUT trocando o nome do blog"
[primeiro-get-put]: images/11-GET-apos-troca-nome.png "GET trazendo o blog, já com o nome trocado"
[primeiro-delete]: images/12-DELETE.png "DELETE para excluir o blog"
[primeiro-get-delete]: images/13-GET-sem-itens-apos-DELETE.png "GET para validar a exclusão do blog"