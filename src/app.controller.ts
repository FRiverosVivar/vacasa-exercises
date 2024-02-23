import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { QueryService } from './services/query.service';

@Controller('/api')
export class AppController {
  constructor(private readonly queryService: QueryService) {}

  @Get()
  getQueryResponse(@Query('q') query: string): string | number {
    if (query === undefined) throw new NotFoundException();
    if (query == '')
      throw HttpException.createBody(
        'Empty query',
        'The query could not be empty or undefined',
        HttpStatus.BAD_REQUEST,
      );

    return this.queryService.calculateQueryResponse(query);
  }
}
