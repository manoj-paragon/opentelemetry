import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { RedisService } from 'nestjs-redis-cluster';

@Processor('audio')
export class AudioConsumer {
    constructor(private readonly redisService: RedisService){}
    client = this.redisService.getClient('test1')

    async doSomething(data: any){
        for(let cat of data) {
            const cats: string = await this.client.get('dogs');
            const catsArray = cats ? JSON.parse(cats) : [];
            catsArray.push(cat);
      
            this.client.set('dogs', JSON.stringify(catsArray));
        }
    }

  @Process('add')
  async transcode(job: Job<unknown>) {
    console.log("Processing")
    await this.doSomething(job.data);
  }
}