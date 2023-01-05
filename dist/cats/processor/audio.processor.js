"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const nestjs_redis_cluster_1 = require("nestjs-redis-cluster");
let AudioConsumer = class AudioConsumer {
    constructor(redisService) {
        this.redisService = redisService;
        this.client = this.redisService.getClient('test1');
    }
    async doSomething(data) {
        for (let cat of data) {
            const cats = await this.client.get('dogs');
            const catsArray = cats ? JSON.parse(cats) : [];
            catsArray.push(cat);
            this.client.set('dogs', JSON.stringify(catsArray));
        }
    }
    async transcode(job) {
        console.log("Processing");
        await this.doSomething(job.data);
    }
};
__decorate([
    (0, bull_1.Process)('add'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AudioConsumer.prototype, "transcode", null);
AudioConsumer = __decorate([
    (0, bull_1.Processor)('audio'),
    __metadata("design:paramtypes", [nestjs_redis_cluster_1.RedisService])
], AudioConsumer);
exports.AudioConsumer = AudioConsumer;
//# sourceMappingURL=audio.processor.js.map