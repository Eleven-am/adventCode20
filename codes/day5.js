const { log, readTxt } = require('./reader')

const day5 = async () => {
    let buffer = await readTxt("puzzle5.txt");
    buffer.sort(sort);

    let binaryArray = buffer.map( ticket => {
        if (ticket !== ''){
            ticket = ticket.replace(/F|L/g, "0");
            ticket = ticket.replace(/B|R/g, "1");
            return parseInt(ticket, 2);
        } else return 0;
    })

    binaryArray.sort(sort);

    log(17, binaryArray[binaryArray.length - 1]);

    for (let i = 35; i < binaryArray.length + 35; i++){
        let value = binaryArray.find( item => item === i);
        if (value === undefined) log(21, i);
    }
}

function sort(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }

    return 0;
}

day5()

module.exports = day5;