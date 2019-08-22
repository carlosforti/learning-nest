import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

describe('PostsService', () => {
  let service: PostsService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [PostsService],
  //   }).compile();

  //   service = module.get<PostsService>(PostsService);
  // });

  beforeEach(() => {
    service = new PostsService(new Repository<Post>());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
