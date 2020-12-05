const { log, readTxt } = require('./reader')

const day4_1 = async () => {
    let buffer = await readTxt("puzzle4.txt");
    buffer = rebuildBuffer(buffer);

    let day4_dataSet = [];
    for (const item of buffer){
        let object = mapString(item);
        if (object !== false)
            day4_dataSet.push(object)
    }

    log(21, day4_dataSet.length);
    return day4_dataSet;
}

const day4_2 = async () => {
    let dataSet = await day4_1();
    let count = 0;

    for (const object of dataSet){
        let matches = object.byr.match(/(?<year>\d{4})/);
        if (matches !== null){
            let date = parseInt(matches.groups.year);
            if (!(1920 <= date && date <= 2002))
                continue;
        } else
            continue;

        matches = object.iyr.match(/(?<year>\d{4})/);
        if (matches !== null){
            let date = parseInt(matches.groups.year);
            if (!(2010 <= date && date <= 2020))
                continue;
        } else
            continue;

        matches = object.eyr.match(/(?<year>\d{4})/);
        if (matches !== null){
            let date = parseInt(matches.groups.year);
            if (!(2020 <= date && date <= 2030))
                continue;
        } else
            continue;

        matches = object.hgt.match(/(?<hgt>\d*)(?<unit>cm|in)/);
        if (matches !== null) {
            let {hgt, unit} = matches.groups;
            if (!((unit === "cm" && 150 <= parseInt(hgt) && parseInt(hgt) <= 193) || (unit === "in" && 59 <= parseInt(hgt) && parseInt(hgt) <= 76)))
                continue;
        } else
            continue;

        matches = object.hcl.match(/#(?<hcl>[0-9a-f]{6})/);
        if (matches === null)
            continue;

        matches = object.ecl.match(/(?<ecl>amb|blu|brn|gry|grn|hzl|oth)/);
        if (matches === null)
            continue;

        matches = object.pid.match(/(?<pid>\d{9})/);
        if (matches !== null) {
            count++;
        }
    }

    log(78, count);
}

const rebuildBuffer = buffer => {
    let result = [];
    let int = 0;

    let string = "";
    while (int < buffer.length){
        if (buffer[int] !== '')
            string += buffer[int] + " ";

        else {
            result.push(string);
            string = "";
        }

        int++;
    }

    return result
}

day4_2();

const mapString = phrase => {
    let object = {};
    let pairs = phrase.split(" ");

    for (const item of pairs){
        let matches = item.match(/(?<key>\w{3}):(?<value>#[0-9a-z]*|\w*)/);
        if (matches !== null) object[matches.groups.key] = matches.groups.value;
    }

    let fields  = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    return ( fields.every(function (field) { return field in object; })) ? object: false;
}
