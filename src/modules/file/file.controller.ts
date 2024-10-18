import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { FileDto } from './file.dto';
import { Response } from 'express';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: FileDto) {
    console.log('file:', file);
    return await this.fileService.upload(file);
  }

  @Get(':id')
  async download(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const { filename, mimetype } = await this.fileService.show(id);
    console.log('filename:', filename, mimetype);
    res.sendFile(filename, {
      root: './uploads',
      headers: {
        'Content-Type': mimetype,
      },
    });
  }
}
