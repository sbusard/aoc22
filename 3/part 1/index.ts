import { readFileSync } from 'fs';
import _ from 'lodash';

function intersection<E>(s1: Set<E>, s2: Set<E>): Set<E> {
  const result = new Set<E>();
  for (const element of s1) {
    if (s2.has(element)) result.add(element);
  }
  return result;
}

function common(rucksack: string): string {
  const first: Set<string> = new Set(rucksack.slice(0, rucksack.length / 2).split(''));
  const second = new Set(rucksack.slice(rucksack.length / 2, rucksack.length).split(''));
  const common = intersection(first, second);
  return common.values().next().value;
}

function priority(item: string): number {
  if(item.charAt(0).toLowerCase() === item.charAt(0)) {
    return item.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  } else {
    return item.charCodeAt(0) - 'A'.charCodeAt(0) + 26 + 1;
  }
}

function solve(inputPath: string) {
  const content = read(inputPath);
  const rucksacks = content.split('\n').filter(r => r);
  return _.sum(rucksacks.map(rucksack => priority(common(rucksack))));
}

function read(inputPath: string): string {
  return readFileSync(inputPath, 'utf8');
}

console.log("Example solved: ", solve('input/example.txt'));
console.log("Input solved: ", solve('input/input.txt'));
