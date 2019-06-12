import { Module } from '@nestjs/common';
import { BlogsController } from './blogs/blogs.controller';
import { BlogService } from './services/blog/blog.service';

@Module({
  controllers: [BlogsController],
  exports: [BlogService],
  providers: [BlogService],
})
export class AppModule { }
