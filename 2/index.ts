import { readFileSync } from 'fs';
import _ from 'lodash';

type Opponent = "A" | "B" | "C";
type Me = "X" | "Y" | "Z";
type Game = [Opponent, Me];

function toOpponent(opponent: string): Opponent {
  if (["A", "B", "C"].includes(opponent)) return opponent as Opponent;
  else throw `Invalid opponent: ${opponent};`
}

function toMe(me: string): Me {
  if (["X", "Y", "Z"].includes(me)) return me as Me;
  else throw `Invalid me: ${me};`
}

function toGame(game: string): Game {
  const split = game.split(" ");
  if (split.length !== 2) throw `Invalid game: ${game}`;
  return [toOpponent(split[0]), toMe(split[1])];
}

function matches(game1: Game, game2: Game): boolean {
  return game1[0] === game2[0] && game1[1] === game2[1];
}

const iWin: Array<Game> = [["A", "Y"], ["B", "Z"], ["C", "X"]];
const iLose: Array<Game> = [["A", "Z"], ["B", "X"], ["C", "Y"]];
const draw: Array<Game> = [["A", "X"], ["B", "Y"], ["C", "Z"]];

function outcome(game: Game): number {
  if (iWin.find(p => matches(p, game))) return 6;
  if (iLose.find(p => matches(p, game))) return 0;
  if (draw.find(p => matches(p, game))) return 3;
  throw `This should never happen; game is ${game}`;
}

const shapeScore = {
  "X": 1,
  "Y": 2,
  "Z": 3
}
function score_part1(game: Game): number {
  return outcome(game) + shapeScore[game[1]];
}

function part1(inputPath: string) {
  const input = readFileSync(inputPath, 'utf8');
  const games = input.split('\n').filter(g => g).map(toGame);
  return _.sum(games.map(score_part1));
}

const shapeForLosing = {
  "A": "Z",
  "B": "X",
  "C": "Y"
}

const shapeForWinning = {
  "A": "Y",
  "B": "Z",
  "C": "X"
}

const shapeForDraw = {
  "A": "X",
  "B": "Y",
  "C": "Z"
}

function whatToPlay(opponent: Opponent, indication: Me): Me {
  if(indication === "X") // lose
  return toMe(shapeForLosing[opponent]);
  if(indication === "Y") // draw
  return toMe(shapeForDraw[opponent]);
  if (indication === "Z") // win
  return toMe(shapeForWinning[opponent]);
  throw `Invalid indication: ${indication}`;
}

function score_part2(game: Game): number {
  const expectedGame = [game[0], ]
  return score_part1([game[0], whatToPlay(game[0], game[1])]);
}

function part2(inputPath: string) {
  const input = readFileSync(inputPath, 'utf8');
  const games = input.split('\n').filter(g => g).map(toGame);
  return _.sum(games.map(score_part2));
}

console.log("Part 1 for example: ", part1('input/example.txt'));
console.log("Part 1 for input: ", part1('input/input.txt'));
console.log("Part 2 for example: ", part2('input/example.txt'));
console.log("Part 2 for input: ", part2('input/input.txt'));
