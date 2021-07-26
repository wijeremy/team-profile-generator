const inquirer = require("inquirer");

const collectInputs = async (inputs = [], x) => {


  const promptsA = [
    {
      type: 'input',
      name: 'inputValue',
      message: 'Enter some input: '
    },
    {
        type: 'input',
        name: 'inputValue1',
        message: 'Enter some ainput: '
    },
    {
        type: 'input',
        name: 'inputValue2',
        message: 'Enter someb input: '
    },
    {
      type: 'confirm',
      name: 'again',
      message: 'Enter another input? ',
      default: true
    }
  ];
  const promptsB = [
    {
      type: 'input',
      name: 'inputValue',
      message: 'Enr some input: '
    },
    {
        type: 'input',
        name: 'inputValue1',
        message: 'Er some ainput: '
    },
    {
        type: 'input',
        name: 'inputValue2',
        message: 'Ener someb input: '
    },
    {
      type: 'confirm',
      name: 'again',
      message: 'Enter another input? ',
      default: true
    }
  ];

  const getPrompt = (x) => {
    if (!x) {
        return promptsA;
    } else {
        return promptsB;
    }
}
    const myPrompt = getPrompt(x)
  const { again, ...answers } = await inquirer.prompt(myPrompt);
  const newInputs = [...inputs, answers];
  return again ? collectInputs(newInputs, 'x') : newInputs;
};

const main = async () => {
  const inputs = await collectInputs();
  console.log(inputs);
};

main();