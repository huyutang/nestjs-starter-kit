import { PostMiddleware } from './post.middleware';

describe('DemoMiddleware', () => {
  it('should be defined', () => {
    expect(new PostMiddleware()).toBeDefined();
  });
});
