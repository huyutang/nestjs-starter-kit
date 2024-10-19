import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';

import { Job, DoneCallback } from 'bull';

//创建队列处理器：用于处理队列中的任务。
@Processor('exampleQueue')
export class QueueProcessor {
  // 处理队列中的任务
  @Process('exampleJob')
  async handleExampleJob(job: Job, done: DoneCallback) {
    console.log('start Processing job:', job.data);
    // 执行任务逻辑

    await new Promise((resolve) => setTimeout(resolve, 5000));

    done(null, 'Job completed successfully');
    console.log("end Processing job:", job.data);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  onComplete(job: Job) {
    console.log(`Completed job ${job.id} of type ${job.name}`);
  }
}
