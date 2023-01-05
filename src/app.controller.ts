import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id/:name')
  getHello(@Param('id') id: string, @Param('name') name: string): string {
    return `${this.appService.getHello()} ${id} ${name}`;
  }
}
