const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const read = promisify(fs.readFile)
const log = (line, info) => console.log(line, info)

const readTxt = async string => {
    let buffer = await read(path.join(__dirname, '../puzzles/' + string), 'utf8');
    return buffer.split("\n");
}

module.exports = {log, readTxt};