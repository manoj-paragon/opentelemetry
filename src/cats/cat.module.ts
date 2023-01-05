import { Module, CacheModule } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {AudioConsumer} from './processor/audio.processor'

@Module({
  controllers: [CatsController],
  providers: [CatsService,AudioConsumer],
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'audio',
    })
  ]
})
export class CatsModule {}