import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  @Put('/cron/:action')
  manageJob(@Param('action') action: string) {
    const greetingJob = this.schedulerRegistry.getCronJob('greeting');
    if (action === 'start') {
      greetingJob.start();
    } else if (action === 'stop') {
      greetingJob.stop();
    } else if (action === 'info') {
      console.log('last executed time:', greetingJob.lastDate());
    }
    return;
  }

  @Post('/cron')
  addJob(@Body() data) {
    const { name, schedule } = data;
    console.log('data:', data, schedule);
    const job = new CronJob(
      schedule,
      () => {
        console.log('customer hello world');
      },
      name,
    );

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    return job.nextDate();
  }

  @Get('/cron/:name')
  checkJob(@Param('name') name: string) {
    const greetingJob = this.schedulerRegistry.getCronJob(name);
    console.log('last executed time:', greetingJob.lastDate());
    return {
      nextDate: greetingJob.nextDate(),
      lastDate: greetingJob.lastDate(),
    };
  }

  @Get('/cron')
  listAllJobs() {
    const jobs = this.schedulerRegistry.getCronJobs();
    const jobList = [];

    jobs.forEach((job, name) => {
      jobList.push({
        name: name,
        nextDate: job.nextDate(),
        lastDate: job.lastDate(),
        schedule: job.cronTime.toString(),
      });
    });

    return jobList;
  }

  @Delete('/cron/:name')
  deleteJob(@Param('name') name: string) {
    const greetingJob = this.schedulerRegistry.getCronJob(name);
    if (greetingJob && greetingJob.running) {
      greetingJob.stop();
    }

    console.log('delete job name:', name);
    this.schedulerRegistry.deleteCronJob(name);
    console.log('delete job success');
    return 'delete job success';
  }
}
