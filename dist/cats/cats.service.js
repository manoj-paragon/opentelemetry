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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsService = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const nestjs_redis_cluster_1 = require("nestjs-redis-cluster");
let CatsService = class CatsService {
    constructor(redisService, audioQueue) {
        this.redisService = redisService;
        this.audioQueue = audioQueue;
        this.cats = [];
        this.client = this.redisService.getClient('test1');
    }
    async create(cat) {
        const cats = await this.client.get('dogs');
        const catsArray = cats ? JSON.parse(cats) : [];
        catsArray.push(cat);
        this.client.set('dogs', JSON.stringify(catsArray));
    }
    async findAll() {
        const cats = await this.client.get('dogs');
        const catsArray = cats ? JSON.parse(cats) : [];
        return catsArray;
    }
    async addMultiple(cat) {
        console.log(cat);
        this.audioQueue.add('add', cat);
    }
};
CatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bull_1.InjectQueue)('audio')),
    __metadata("design:paramtypes", [nestjs_redis_cluster_1.RedisService, Object])
], CatsService);
exports.CatsService = CatsService;
//# sourceMappingURL=cats.service.js.map