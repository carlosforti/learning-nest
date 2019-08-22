import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

describe('Posts Controller', () => {
  let controller: PostsController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [PostsController],
  //   }).compile();

  //   controller = module.get<PostsController>(PostsController);
  // });

  beforeEach(() => {
    controller = new PostsController(new PostsService(new Repository<Post>()));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
