import { Injectable } from '@nestjs/common';
import { QuestionTypeEnum } from 'src/enum/question-type.enum';
import { Answers, Expressions } from 'src/expressions.constants';
import {
  countWordsVowelsAndConsonants,
  determineTypeOfQuery,
  getCombinationResult,
  getResponseFrom2DGrid,
  sumQuery,
} from 'src/utils/utils';

@Injectable()
export class QueryService {
  calculateQueryResponse(query: string) {
    const queryType = determineTypeOfQuery(query);
    switch (queryType) {
      case QuestionTypeEnum.Ping: {
        return Answers.Pong;
      }
      case QuestionTypeEnum.Name: {
        return Answers.Name;
      }
      case QuestionTypeEnum.Quest: {
        return Answers.Quest;
      }
      case QuestionTypeEnum.Sum: {
        return sumQuery(query);
      }
      case QuestionTypeEnum.ABCDEGrid: {
        const oneDimMatrix = query
          .split('\r')
          .map((a) => a.replace(/\s+/g, ''));
        const wordToReOrder = oneDimMatrix.splice(0, 1)[0];
        return getResponseFrom2DGrid(
          wordToReOrder,
          oneDimMatrix.map((a) => a.replace(/[A-Z]+/g, '')),
        );
      }
      case QuestionTypeEnum.Combination: {
        return getCombinationResult(query.match(/\d+/g).map((a) => Number(a)));
      }
      case QuestionTypeEnum.Words: {
        return countWordsVowelsAndConsonants(query.split(' '));
      }
      case QuestionTypeEnum.SourceCode: {
        return Answers.SourceCode;
      }
      default: {
        // TO-DO add connection to openai and ask to chat gpt the response of that question :)
      }
    }

    return '🥳';
  }
}
