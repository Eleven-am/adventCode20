const { log, readTxt } = require('./codes/reader')

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
    let letters = '';

    alphabets.forEach( letter => {
        let rgx = new RegExp(letter, 'g');
        let value = true;
        let int = 0;

        while (int < groups.length){
            if (groups[int] !== "")
                value = rgx.test(groups[int]);
            int++;
        }

        letters += value ? letter: '';
    })

    return letters;
}

day6_2();
module.exports = { day6_1, day6_2 };