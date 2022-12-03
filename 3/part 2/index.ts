import { readFileSync } from 'fs';
import _ from 'lodash';

function intersection<E>(s1: Set<E>, s2: Set<E>): Set<E> {
  const result = new Set<E>();
  for (const element of s1) {
    if (s2.has(element)) result.add(element);
  }
  return result;
}

function common(rucksack1: string, rucksack2: string, rucksack3: string): string {
  const common = intersection(intersection(new Set(rucksack1), new Set(rucksack2)), new Set(rucksack3));
  return common.values().next().value;
}

function priority(item: string): number {
  if(item.charAt(0).toLowerCase() === item.charAt(0)) {
    return item.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  } else {
    return item.charCodeAt(0) - 'A'.charCodeAt(0) + 26 + 1;
  }
}

function group<E>(elements: Array<E>, groupSize: number): Array<Array<E>> {
  const result = [];
  for (let g = 0; g < elements.length; g += groupSize) {
    result.push(elements.slice(g, g + groupSize));
  }
  return result;
}

function solve(inputPath: string) {
  const content = read(inputPath);
  const rucksacks = content.split('\n').filter(r => r);
  const groups = group(rucksacks, 3);
  return _.sum(groups.map(group => priority(common(group[0], group[1], group[2]))));
}

function read(inputPath: string): string {
  return readFileSync(inputPath, 'utf8');
}

console.log("Example solved: ", solve('input/example.txt'));
console.log("Input solved: ", solve('input/input.txt'));
