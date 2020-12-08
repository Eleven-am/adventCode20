const { log, readTxt } = require('./reader')

Array.prototype.unique = function(){
    let uniqueArray = [];
    for(let i = 0; i < this.length; i++)
        if(uniqueArray.indexOf(this[i]) === -1)
            uniqueArray.push(this[i]);

    return uniqueArray;
}

const buildRules = buffer => {
    let object = {};

    for (let item of buffer){
        let holder = item.match(/(?<holder>^.*)(?=( contain))/);
        if (holder !== null) {
            holder = holder.groups.holder;
            item = item.replace(/^.*(?=( contain))/, '');
            let allSubs = false;
            let subsObj = [];
            while (!allSubs) {
                let subs = item.match(/(?<digit>\d) (?<desc>\w* \w*) (bags|bag)/);
                if (subs !== null) {
                    item = item.replace(/\d \w* \w* bags|bag/, '').replace(' ,', '');
                    let temp = {name: subs.groups.desc, quantity: parseInt(subs.groups.digit)};
                    subsObj.push(temp);
                    allSubs = item === ' contain .';
                } else allSubs = true;
            }
            object[holder] = subsObj;
        }
    }

    return object;
}

const getBagsWithKid = (needle, rules) => {
    needle = needle.replace(' bags', '');
    let holders = [];

    for (const bag of Object.keys(rules))
        if (rules[bag].some(rule => rule.name === needle))
            holders.push(bag);

    for (const holder of holders)
        holders = holders.concat(getBagsWithKid(holder, rules));

    return holders.unique();
}

const getNumbOfBagsWithin = (needle, rules) => {
    let bags = rules[needle];
    let subBags = 0;

    for(const item of bags){
        let numbOfBagsWithin = 1 + getNumbOfBagsWithin(item.name + ' bags', rules);
        subBags += numbOfBagsWithin === 0 ? item.quantity: item.quantity * numbOfBagsWithin;
    }

    return subBags;
}

const day7 =  async () => {
    let buffer = await readTxt('puzzle7.txt');
    let rules = buildRules(buffer);
    let gold = 'shiny gold bags';
    let numbers = getBagsWithKid(gold, rules);
    let numbOfBagsWithin = getNumbOfBagsWithin(gold, rules);
    log(70, numbers.length);
    log(71, numbOfBagsWithin);
}

module.exports = day7;