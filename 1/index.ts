import { readFileSync } from 'fs';
import _ from 'lodash';

function extractBlocks(input: string) {
    const blocks = [[]];
    const split = input.split('\n\n');
    return split.map((block) => block.split('\n').map((f) => Number(f)));
}

function part1(inputPath: string) {
    const input = readFileSync(inputPath, 'utf8');
    const blocks = extractBlocks(input);
    const calories = blocks.map((block) => _.sum(block));
    return _.max(calories);
}

function part2(inputPath: string) {
    const input = readFileSync(inputPath, 'utf8');
    const blocks = extractBlocks(input);
    const calories = blocks.map((block) => _.sum(block));
    const sortedCalories = _.sortBy(calories, (b) => -b);
    return _.sum(sortedCalories.slice(0, 3));
}

console.log(part2('input/input.txt'));