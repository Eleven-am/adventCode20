const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const read = promisify(fs.readFile)
const log = (line, info) => console.log(line, info)

const readTxt = async string => {
    let buffer = await read(path.join(__dirname, string), 'utf8');
    return buffer.split('\n');
}

const day1 = async () => {
    let buffer = await readTxt("puzzle1.txt");

    let puzzle = [];
    for (let item of buffer)
        puzzle.push(parseInt(item));

    //puzzle a
    for (const item of puzzle)
        for (const item2 of puzzle)
            if (item + item2 === 2020)
                log(25, item * item2);

    //puzzle b
    for (const item of puzzle)
        for (const item2 of puzzle)
            for (const item3 of puzzle)
                if (item + item2 + item3 === 2020)
                    log(25, item * item2 * item3);
}

const day2 = async () => {
    let buffer = await readTxt("puzzle2.txt");

    let count = 0;
    let pos = 0;
    for (const item of buffer) {
        let regex = /(?<d1>\d{1,6})-(?<d2>\d{1,6}) (?<letter>[a-z]): (?<password>\w+)/;
        let matches = item.match(regex);
        if (matches !== null) {
            let {d1, d2, letter, password} = matches.groups;
            count += day2Count(password, parseInt(d1), parseInt(d2), letter) ? 1 : 0;
            pos += dat2Pos(password, parseInt(d1), parseInt(d2), letter) ? 1 : 0;
        }
    }

    log(46, count);
    log(47, pos);
}

const day2Count = (word, min, max, letter) => {
    let value = 0;
    for (let i = 0; i < word.length; i++)
        if (word[i] === letter)
            value += 1;

    return min <= value && value <= max;
}

const dat2Pos = (word, min, max, letter) => {
    return (word[min - 1] === letter && word[max - 1] !== letter) || (word[min - 1] !== letter && word[max - 1] === letter);
}

const day3 = async () => {
    let buffer = await readTxt("puzzle3.txt");

    let thirdA = countTrees(buffer, 3, 1);
    let thirdB1 = countTrees(buffer, 1, 1);
    let thirdB3 = countTrees(buffer, 5, 1);
    let thirdB4 = countTrees(buffer, 7, 1);
    let thirdB5 = countTrees(buffer, 1, 2);

    log(74, thirdA);
    log(75, thirdA * thirdB1 * thirdB3 * thirdB4 * thirdB5);
}

const countTrees = (buffer, xAxis, yAxis) => {
    let i = 0;
    let j = yAxis;
    let count = 0;
    while (j < buffer.length){
        i = i + xAxis >=  buffer[j].length ? xAxis - (buffer[j].length -i) : i + xAxis;
        count += buffer[j][i] === "#" ? 1: 0;
        j += yAxis;
    }

    return count;
}
