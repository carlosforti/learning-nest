import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

describe('CommentsService', () => {
  let service: CommentsService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [CommentsService],
  //   }).compile();

  //   service = module.get<CommentsService>(CommentsService);
  // });

  beforeEach(async () => {
    service = new CommentsService(new Repository<Comment>());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
