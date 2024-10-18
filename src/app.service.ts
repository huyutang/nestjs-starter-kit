import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class AppService {
  @Cron(CronExpression.EVERY_5_MINUTES, { name: 'greeting' })
  handleCron() {
    console.log('Cron Hello World!');
  }

  @Interval(30000)
  handleInterval() {
    console.log('Interval Hello World!');
  }

  @Timeout(30000)
  handleTimeout() {
    console.log('Timeout Hello World!');
  }
}
