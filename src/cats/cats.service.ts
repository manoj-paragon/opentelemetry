import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { RedisService } from 'nestjs-redis-cluster';
import { Queue } from 'bull';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  constructor(
    private readonly redisService: RedisService,
    @InjectQueue('audio') private audioQueue: Queue
    ) {}
    private readonly cats: Cat[] = [];
    client = this.redisService.getClient('test1')

    async create(cat: Cat) {
      const cats: string = await this.client.get('dogs');
      const catsArray: Cat[] = cats ? JSON.parse(cats) : [];
      catsArray.push(cat);

      this.client.set('dogs', JSON.stringify(catsArray));
    }
  
    async findAll(): Promise<Cat[]> {
      const cats: string = await this.client.get('dogs');
      const catsArray: Cat[] = cats ? JSON.parse(cats) : [];
      return catsArray;
    }

    async addMultiple(cat: Cat[]) {
      console.log(cat)
      this.audioQueue.add('add', cat)
    }
}
