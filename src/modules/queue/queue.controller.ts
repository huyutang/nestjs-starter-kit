import { Body, Controller, Post } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('add-job')
  async addJob(@Body() data: any) {
    console.log('data:', data);
    await this.queueService.addJob(data);
    return 'Job added to queue';
  }
}
