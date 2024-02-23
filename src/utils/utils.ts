import { QuestionType, QuestionTypeEnum } from 'src/enum/question-type.enum';
import { DirectionEnum, Expressions } from 'src/expressions.constants';
export function countVowels(word: string): number {
  return (word.match(/[aeiouAEIOU]/g) || []).length;
}
export function countConsonants(s: string) {
  return (s.match(/[a-zA-Z]/g) || []).length - countVowels(s);
}
export function determineTypeOfQuery(query: string): QuestionTypeEnum {
  for (let i = 0; i < Expressions.length; i++) {
    if (i == 4) {
      if (query.split('\n')[0].replace(/\s+/g, '').match(Expressions[i])) {
        return QuestionType[i];
      }
    }
    if (query.match(Expressions[i])) {
      return QuestionType[i];
    }
  }

  return QuestionTypeEnum.Unknown;
}
export function sumQuery(query: string): number {
  return query
    .split('+')
    .map((a) => a.replace(/\D+/g, ''))
    .reduce((a, b) => Number(a) + Number(b), 0);
}
export function getCombinationResult(combination: number[]): string {
  let oddNumberList = combination.filter((a) => a % 2 !== 0);
  let evenNumberList = combination.filter((a) => a % 2 === 0);
  const finalResultsOfCombination: number[] = [];
  do {
    let max = Math.max(...evenNumberList);
    let min = Math.min(...oddNumberList);
    const maxIndex = evenNumberList.indexOf(max);
    evenNumberList.splice(maxIndex, 1);
    const minIndex = oddNumberList.indexOf(min);
    oddNumberList.splice(minIndex, 1);
    finalResultsOfCombination.push(min + max);
  } while (oddNumberList.length !== 0 && evenNumberList.length !== 0);
  return finalResultsOfCombination.join(' ');
}
export function countWordsVowelsAndConsonants(words: string[]): string {
  let totalVowels: number = 0;
  let totalConsonants: number = 0;
  for (let word of words) {
    totalVowels += countVowels(word);
    totalConsonants += countConsonants(word);
  }
  return `${words.length}-${totalConsonants}-${totalVowels}`;
}
export function getResponseFrom2DGrid(
  wordToReOrder: string,
  movementsList: string[],
): string {
  let reOrderedWord = '';
  const islands = [];
  movementsList.forEach((move: string, index) => {
    if (move.includes('=')) return;

    const island = reOrderWordByMovementString(
      wordToReOrder,
      reOrderedWord,
      move,
      wordToReOrder.charAt(index),
    );

    if (reOrderedWord === '' && !reOrderedWord.includes(island)) {
      reOrderedWord = island;
      return;
    }
    if (island.includes(reOrderedWord)) {
      reOrderedWord = island;
      return;
    }
    islands.push(reOrderedWord);
    islands.push(island);
    reOrderedWord = '';
  });
  if (islands.length > 0) {
    islands.push(reOrderedWord);
    return mergeStrings(islands);
  }

  return reOrderedWord;
}
function reOrderWordByMovementString(
  originalWord: string,
  word: string,
  movement: string,
  letter: string,
) {
  for (let i = 0; i < movement.length; i++) {
    switch (movement.charAt(i)) {
      case '<': {
        const positionLetter = originalWord.charAt(i);
        if (positionLetter === letter) continue;

        if (!word.includes(positionLetter) && !word.includes(letter)) {
          word = `${letter}${positionLetter}`;
        }
        if (!word.includes(positionLetter)) {
          const indexPositionLetter = word.indexOf(positionLetter);
          const firstPartSplittedWord = word.slice(0, indexPositionLetter + 1);
          const secondPartSplittedWord = word.slice(indexPositionLetter + 1);
          word = `${firstPartSplittedWord}${positionLetter}${secondPartSplittedWord}`;
          continue;
        }
        if (!word.includes(letter)) {
          const indexPositionLetter = word.indexOf(positionLetter);
          const firstPartSplittedWord = word.slice(0, indexPositionLetter + 1);
          const secondPartSplittedWord = word.slice(indexPositionLetter + 1);
          word = `${letter}${firstPartSplittedWord}${secondPartSplittedWord}`;
        }
        break;
      }
      case '>': {
        const positionLetter = originalWord.charAt(i);
        if (positionLetter === letter) continue;

        if (!word.includes(positionLetter) && !word.includes(letter)) {
          word = `${positionLetter}${letter}`;
          continue;
        }
        if (!word.includes(positionLetter)) {
          const indexPositionLetter = word.indexOf(positionLetter);
          const firstPartSplittedWord = word.slice(0, indexPositionLetter + 1);
          const secondPartSplittedWord = word.slice(indexPositionLetter + 1);
          word = `${firstPartSplittedWord}${positionLetter}${secondPartSplittedWord}`;
          continue;
        }
        if (!word.includes(letter)) {
          const indexPositionLetter = word.indexOf(positionLetter);
          const firstPartSplittedWord = word.slice(0, indexPositionLetter + 1);
          const secondPartSplittedWord = word.slice(indexPositionLetter + 1);

          word = `${firstPartSplittedWord}${letter}${secondPartSplittedWord}`;
        }
        break;
      }
    }
  }
  return word;
}
function mergeTwoStrings(a: string, b: string): string | null {
  for (let i = 0; i < a.length; i++) {
    if (b.startsWith(a.substring(i))) {
      return a.substring(0, i) + b;
    }
  }
  return null;
}
function mergeStrings(strings: string[]): string {
  do {
    externalFor: for (let i = 0; i < strings.length; i++) {
      for (let j = 0; j < strings.length; j++) {
        if (i !== j) {
          const mergedString = mergeTwoStrings(strings[i], strings[j]);
          if (mergedString) {
            strings[i] = mergedString;
            strings.splice(j, 1);
            break externalFor;
          }
        }
      }
    }
  } while (strings.length > 1);
  return strings.join('');
}
