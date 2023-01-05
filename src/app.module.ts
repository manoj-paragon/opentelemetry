import { Module, CacheModule } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis-cluster';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cat.module';

@Module({
  imports: [
    RedisModule.register({
      name: 'test1',
      url: 'redis://localhost:6379'
    }),
    CatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
