import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('exampleQueue')
    private readonly queue: Queue,
  ) {}

  async addJob(data: any) {
    console.log("addJob:", data);
    try {
      await this.queue.add('exampleJob', data);
    } catch (error) {
      console.error('Error adding job to queue:', error);
    }
    console.log("Job added to queue");
  }
}
