import { Comment } from './comment.entity';

describe('Comment', () => {
  it('should be defined', () => {
    expect(new Comment()).toBeDefined();
  });
});
