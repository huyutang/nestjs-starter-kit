import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register({
      dest: './uploads',
      fileFilter(
        req: any,
        file: {
          fieldname: string;
          originalname: string;
          encoding: string;
          mimetype: string;
          size: number;
          destination: string;
          filename: string;
          path: string;
          buffer: Buffer;
        },
        callback: (error: Error | null, acceptFile: boolean) => void,
      ) {
        console.log('file:', file.mimetype);
        if (file.mimetype.match(/\/(jpg|jpeg|png|plain)$/)) {
          callback(null, true);
        } else {
          callback(new Error('Only image/text files are allowed!'), false);
        }
      },
    }),
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
