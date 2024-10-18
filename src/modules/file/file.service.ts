import { Injectable } from '@nestjs/common';
import { FileDto } from './file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async upload(file: FileDto) {
    const entity = this.fileRepository.create(file);
    return this.fileRepository.save(entity);
  }

  async show(id: number): Promise<File> {
    return this.fileRepository.findOneBy({ id });
  }
}
