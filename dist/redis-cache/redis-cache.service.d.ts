import { Cache } from 'cache-manager';
export declare class RedisCacheService {
    private readonly cache;
    constructor(cache: Cache);
    get(key: string): Promise<void>;
    set(key: string, value: string): Promise<void>;
}
