import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueryService } from './services/query.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, QueryService],
})
export class AppModule {}
