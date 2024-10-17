import { forwardRef, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]),
    AuthModule
  ],
  controllers: [PostsController],
  providers: [PostService],
})
export class PostsModule {}
