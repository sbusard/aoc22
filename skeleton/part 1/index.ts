import { readFileSync } from 'fs';
import _ from 'lodash';

function solve(inputPath: string) {
  const content = read(inputPath);
}

function read(inputPath: string): string {
  return readFileSync(inputPath, 'utf8');
}

console.log("Example solved: ", solve('input/example.txt'));
console.log("Input solved: ", solve('input/input.txt'));
