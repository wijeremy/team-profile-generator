const fs = require('fs');
const inquirer = require('inquirer');
const { Manager, Engineer, Intern } = require('./util/constructors.js');
const {
  basePrompts,
  managerPrompt,
  engineerPrompt,
  internPrompt,
  select,
} = require('./util/prompts');
const topFile = './util/HTMLTemplates/top.txt';
const cardFile = './util/HTMLTemplates/card.txt';
const botFile = './util/HTMLTemplates/bot.txt';

//returns a string with all instances of one bit of text replaced by
//used for replacing variables in our html
replaceText = (fullText, oldText, newText) => {
  let arr = fullText.split(oldText);
  return arr.join(newText);
};

//this is a promisified combo function that reads from a source and append
//to our index.html file (basically copy pastes content from our txt files)
const readAppend = (source) => {
  return new Promise((resolve, reject) => {
    fs.readFile(source, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      fs.appendFile('index.html', `${data}\n`, (err) =>
        err
          ? reject((err) => console.error(err))
          : resolve(() => console.log('Success!'))
      );
    });
  });
};

//this is used after we gather all the imputs from our prompt
//we use the replace text here to replace the variables in our txt card file
//with the answers from out prompt. it also appends the full, replaced text
//to index.html
const populateCard = (obj) => {
  return new Promise((resolve, reject) => {
    fs.readFile(cardFile, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      const { name, id, email, role } = obj;

      let arr = Object.keys(obj);
      const key = arr[3];
      const value = obj[key];

      data = replaceText(data, '${name}', name);
      data = replaceText(data, '${role}', role);
      data = replaceText(data, '${id}', id);
      data = replaceText(data, '${email}', email);
      data = replaceText(data, '${key}', key);
      data = replaceText(data, '${value}', value);

      fs.appendFile('index.html', `${data}\n`, (err) => {
        err
          ? reject((err) => console.error(err))
          : resolve(() => console.log('Success!'));
      });
    });
  });
};

//this is our prompt function. it will ask for information about the manager first, and
//then give the option to add either an engineer or an intern
//the final output is an array of employees
const collectInputs = async (inputs = [], rolePrompt) => {
  const getPrompt = (promptName) => {
    if (!promptName) {
      return managerPrompt;
    } else {
      return rolePrompt;
    }
  };
  const myPrompt = getPrompt(rolePrompt);
  const myPrompts = [...basePrompts, myPrompt, select];
  const { nextRole, ...answers } = await inquirer.prompt(myPrompts);
  const setRole = (currentPrompt) => {
    if (currentPrompt === managerPrompt) {
      return new Manager(...Object.values(answers));
    } else if (currentPrompt === engineerPrompt) {
      return new Engineer(...Object.values(answers));
    } else if (currentPrompt === internPrompt) {
      return new Intern(...Object.values(answers));
    } else {
      return answers;
    }
  };
  const newEmployee = setRole(myPrompt);
  const newInputs = [...inputs, newEmployee];
  const getNextPrompt = (roleName) => {
    if (roleName === 'Engineer') {
      return engineerPrompt;
    } else if (roleName === 'Intern') {
      return internPrompt;
    } else {
      return false;
    }
  };
  const nextPrompt = getNextPrompt(nextRole);
  return nextPrompt ? collectInputs(newInputs, nextPrompt) : newInputs;
};

//here we collect inputs, write a header, populate our cards, and finally write a footer
const main = async () => {
  try {
    const inputs = await collectInputs();
    await readAppend(topFile);
    for (let i = 0; i < inputs.length; i++) {
      await populateCard(inputs[i]);
    }
    readAppend(botFile);
  } catch (err) {
    throw err;
  }
};

main();
