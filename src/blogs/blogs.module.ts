import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blog.service';
import { Blog } from './blog.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Blog])],
    controllers: [BlogsController],
    providers: [BlogsService]
})
export class BlogsModule {}
