import { Injectable } from '@nestjs/common';
import { countVowelsAndConsonants } from 'src/utils/utils';

@Injectable()
export class QueryService {
  calculateQueryResponse(query: string) {
    console.log(query);
    if (query.includes('+')) {
      const splittedQuery = query.split('+');
      return +splittedQuery[0] + +splittedQuery[1];
    }

    return countVowelsAndConsonants(query);
  }
}
