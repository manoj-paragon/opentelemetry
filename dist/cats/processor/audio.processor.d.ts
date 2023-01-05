import { Job } from 'bull';
import { RedisService } from 'nestjs-redis-cluster';
export declare class AudioConsumer {
    private readonly redisService;
    constructor(redisService: RedisService);
    client: import("ioredis/built/Redis").default;
    doSomething(data: any): Promise<void>;
    transcode(job: Job<unknown>): Promise<void>;
}
