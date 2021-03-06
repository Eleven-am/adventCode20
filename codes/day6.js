const { log, readTxt } = require('./reader')

const day6_1 = async () => {
    let buffer = await readTxt("puzzle6.txt");
    buffer = reBuildBuffer(buffer);

    let groups = buffer.map( group => {
        return scan(group);
    });

    let length = groups.map( item => {
        return item.length;
    })

    let result = length.reduce((result, item) => {
        return result + item;
    })

    log(11, result);
}

const day6_2 = async () => {
    let buffer = await readTxt("puzzle6.txt");
    buffer = reBuildBuffer(buffer);

    let groups = buffer.map( group => {
        return scan2(group);
    });

    let length = groups.map( item => {
        return item.length;
    })

    log(34, length)

    let result = length.reduce((result, item) => {
        return result + item;
    })

    log(39, result)
}

const reBuildBuffer = buffer => {
    let result = [];
    let int = 0;

    let string = "";
    while (int < buffer.length){
        if (buffer[int] !== '')
            string += buffer[int] + ' ';

        else {
            result.push(string);
            string = "";
        }

        int++;
    }

    return result
}

const scan = grouping => {
    let alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
    let letters = '';

    alphabets.forEach( letter => {
        let rgx = new RegExp(letter, 'g');
        letters += rgx.test(grouping) ? letter: '';
    })

    return letters;
}

const scan2 = grouping => {
    let groups = grouping.split(' ');
    let alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
    let letters = "";

    alphabets.forEach( letter => {
        let count = 0;
        let int = 0;

        while (int < groups.length){
            if (groups[int] !== "")
                count += groups[int].includes(letter) ? 1: 0;
            int++;
        }

        letters += (count === groups.length - 1 )? letter: '';
    })

    return letters;
}

module.exports = { day6_1, day6_2 };