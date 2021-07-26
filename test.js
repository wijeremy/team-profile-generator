const fs = require('fs');
const filler = require('./filler.json');
const topFile = './util/top.txt'
const cardFile = './util/card.txt'
const botFile = './util/bot.txt'
const myObj = filler[0]

replaceText = (fullText, oldText, newText) => {
    let arr = fullText.split(oldText);
    return arr.join(newText);
}

const readAppend = async (source, location) => {
    fs.readFile(source, 'utf8', (err, data) => {
        if (err){
            throw err;
        };
        fs.appendFile(location, `${data}\n`, (err) =>
            err? console.error(err) : console.log('Success!')
        )
    });
};

readAppend(topFile, 'index.html') 



