export const Expressions = [
  /\bping\b/i,
  /What is your name\?/,
  /What is your quest\?/,
  /\d+( \+ \d+)+ = \?/,
  /^[A-Z]+/,
  /^< \d+( \d+)+ >$/,
  /\bsource code\b/i,
  /^[a-z]+( [a-z]+)*$/,
];
export enum Answers {
  Pong = 'PONG',
  Name = "Hi, my name is Vacasa Coding Exercises 🤖, but my developer's name is Franco 🚀.",
  Quest = 'coding',
  SourceCode = '👨🏻‍💻🌃 -> https://github.com/FRiverosVivar/vacasa-exercises',
}
export enum DirectionEnum {
  Right,
  Left,
  Between,
}
