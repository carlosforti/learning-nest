import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';

describe('Comments Controller', () => {
  let controller: CommentsController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [CommentsController],
  //   }).compile();

  //   controller = module.get<CommentsController>(CommentsController);
  // });

  beforeEach(() => {
    controller = new CommentsController(new CommentsService(new Repository<Comment>()));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
