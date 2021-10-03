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

replaceText = (fullText, oldText, newText) => {
  let arr = fullText.split(oldText);
  return arr.join(newText);
};

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

// const readAppend = (source) => {
//     fs.readFile(source, 'utf8', (err, data) => {
//         if (err){
//             throw err;
//         };
//         fs.appendFile('index.html', `${data}\n`, (err) =>
//             err? console.error(err) : console.log('Success!')
//         )
//     });
// };
const populateCard = (obj) => {
  return new Promise((resolve, reject) => {
    fs.readFile(cardFile, 'utf8', (err, data) => {
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

      fs.appendFile('index.html', `${data}\n`, (err) => {
        err
          ? reject((err) => console.error(err))
          : resolve(() => console.log('Success!'));
      });
    });
  });
};
// const populateCard = (obj, source) => {
//   fs.readFile(source, 'utf8', (err, data) => {
//     if (err) {
//       throw err;
//     }

//     const { name, id, email, role, phone } = obj;

//     let arr = Object.keys(obj);
//     const key = arr[3];
//     const value = obj[key];

// data = replaceText(data, '${name}', name);
// data = replaceText(data, '${role}', role);
// data = replaceText(data, '${id}', id);
// data = replaceText(data, '${email}', email);
// data = replaceText(data, '${key}', key);
// data = replaceText(data, '${value}', value);

//     fs.appendFile('index.html', `${data}\n`, (err) =>
//       err ? console.error(err) : console.log('Success!')
//     );
//   });
// };

// const setCards = async (objArr) => {
//   objArr.map((i) => {
//     try {
//       await populateCard(i, cardFile, 'index.html');
//     } catch (err) {
//       err;
//     }
//   });
// };

// const setCards = (objArr) => {
//   let i = 0;
//   const myLoop = () => {
//     setTimeout(() => {
//       populateCard(objArr[i], cardFile, 'index.html');
//       i++;
//       if (i < objArr.length) {
//         myLoop();
//       }
//     }, 50);
//   };
//   myLoop();
// };

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
