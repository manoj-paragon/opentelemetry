import { RedisService } from 'nestjs-redis-cluster';
import { Queue } from 'bull';
import { Cat } from './interfaces/cat.interface';
export declare class CatsService {
    private readonly redisService;
    private audioQueue;
    constructor(redisService: RedisService, audioQueue: Queue);
    private readonly cats;
    client: import("ioredis/built/Redis").default;
    create(cat: Cat): Promise<void>;
    findAll(): Promise<Cat[]>;
    addMultiple(cat: Cat[]): Promise<void>;
}
