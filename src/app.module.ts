import { Module } from '@nestjs/common';
import { BlogModule } from './blogs/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    BlogModule]
})
export class AppModule { }
