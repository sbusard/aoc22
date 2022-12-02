import { readFileSync } from 'fs';
import _ from 'lodash';

function extractBlocks(input: string): Array<Array<number>> {
    const blocks = input.split('\n\n');
    return blocks.map((block) => block.split('\n').map((f) => Number(f)));
}

function part1(inputPath: string): number | undefined {
    const input = readFileSync(inputPath, 'utf8');
    const blocks = extractBlocks(input);
    const calories = blocks.map((block) => _.sum(block));
    return _.max(calories);
}

function part2(inputPath: string): number {
    const input = readFileSync(inputPath, 'utf8');
    const blocks = extractBlocks(input);
    const calories = blocks.map((block) => _.sum(block));
    const sortedCalories = _.sortBy(calories, (b) => -b);
    return _.sum(sortedCalories.slice(0, 3));
}

console.log("Part 1: ", part1('input/input.txt'));
console.log("Part 2: ", part2('input/input.txt'));
