const { log, readTxt } = require('./reader')

const day4_1 = async () => {
    let buffer = await readTxt("puzzle4.txt");
    buffer = rebuildBuffer(buffer);
    let fields  = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    let day4_dataSet = [];

    let count = 0;
    for (const item of buffer) {
        let i = 0;
        let minCount = 0;
        while (i < 7){
            minCount += item.includes(fields[i]) ? 1: 0;
            i++;
        }

        count += minCount === 7 ? 1: 0;
        if (minCount === 7) day4_dataSet.push(item);
    }

    log(21, count);
    return day4_dataSet;
}

const day4_2 = async () => {
    let dataSet = await day4_1();
    let count = 0;

    for (const item of dataSet){
        let matches = item.match(/byr:(?<year>\d{4})/);
        if (matches !== null){
            let date = parseInt(matches.groups.year);
            if (!(1920 <= date && date <= 2002))
                continue;
        } else
            continue;

        matches = item.match(/iyr:(?<year>\d{4})/);
        if (matches !== null){
            let date = parseInt(matches.groups.year);
            if (!(2010 <= date && date <= 2020))
                continue;
        } else
            continue;

        matches = item.match(/eyr:(?<year>\d{4})/);
        if (matches !== null){
            let date = parseInt(matches.groups.year);
            if (!(2020 <= date && date <= 2030))
                continue;
        } else
            continue;

        matches = item.match(/hgt:(?<hgt>\d*)(?<unit>cm|in)/);
        if (matches !== null) {
            let {hgt, unit} = matches.groups;
            if (!((unit === "cm" && 150 <= parseInt(hgt) && parseInt(hgt) <= 193) || (unit === "in" && 59 <= parseInt(hgt) && parseInt(hgt) <= 76)))
                continue;
        } else
            continue;

        matches = item.match(/hcl:#(?<hcl>\d{6}|[a-f]{6})/);
        if (matches === null)
            continue;

        matches = item.match(/ecl:(?<ecl>amb|blu|brn|gry|grn|hzl|oth)/);
        if (matches === null)
            continue;

        matches = item.match(/pid:(?<pid>\d{9})/);
        if (matches !== null) {
            count++;
            log(item)
        }
    }

    log(73, count);
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