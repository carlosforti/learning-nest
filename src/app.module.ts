import { Module } from '@nestjs/common';
import { BlogModule } from './blogs/blog.module';

@Module({
  imports: [BlogModule],
})
export class AppModule { }
