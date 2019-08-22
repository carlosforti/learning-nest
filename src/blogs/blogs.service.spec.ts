import { Test, TestingModule } from '@nestjs/testing';
import { BlogsService } from './blogs.service';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { identifier } from '@babel/types';

describe('BlogService', () => {
  let service: BlogsService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [BlogsService],
  //   }).compile();

  //   service = module.get<BlogsService>(BlogsService);
  // });

  beforeEach(() => {
    service = new BlogsService(new Repository<Blog>());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
