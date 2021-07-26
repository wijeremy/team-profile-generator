const fs = require('fs');
const filler = require('./filler.json');
const topFile = './util/top.txt';
const cardFile = './util/card.txt';
const botFile = './util/bot.txt';
const myObj = filler[0];

// console.log(filler)

replaceText = (fullText, oldText, newText) => {
    let arr = fullText.split(oldText);
    return arr.join(newText);
}

const readAppend = async (source) => {
    fs.readFile(source, 'utf8', (err, data) => {
        if (err){
            throw err;
        };
        fs.appendFile('index.html', `${data}\n`, (err) =>
            err? console.error(err) : console.log('Success!')
        )
    });
};

const populateCard = async (obj, source) => {
    fs.readFile (source, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        const { name, id, email, role, phone } = obj;

        let arr = Object.keys(obj);
        const key = arr[3];
        const value = obj[key];

        data = replaceText(data, '${name}', name);
        data = replaceText(data, '${role}', role);
        data = replaceText(data, '${id}', id);
        data = replaceText(data, '${email}', email);
        data = replaceText(data, '${key}', key);
        data = replaceText(data, '${value}', value);

        fs.appendFile('index.html', `${data}\n`, (err) =>
            err? console.error(err) : console.log('Success!')
        );      
    })
}

const setCards = async (objArr) => {
    let i = 0
    const myLoop = () => {
        setTimeout(()=> {
            populateCard(objArr[i], cardFile, 'index.html')
            i++;
            if (i<objArr.length){
                myLoop()
            }
        }, 50)
    }  
    myLoop();
}

setCards(filler)

const writeHTML = (data) => {
    readAppend(topFile, 'index.html');
    setCards(data);
    readAppend(botFile, 'index.html')
}


