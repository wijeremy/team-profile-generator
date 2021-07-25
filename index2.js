const inquirer = require("inquirer");
const employee = require('./constructor.js')
const prompt = require('./prompts')


const collectInputs = async (inputs = []) => {
    const prompts = [
      {
        type: 'input',
        name: 'inputValue',
        message: 'Enter some input: '
      },
      {
        type: 'confirm',
        name: 'again',
        message: 'Enter another input? ',
        default: true
      }
    ];
  
    const { again, ...answers } = await inquirer.prompt(prompts);
    const newInputs = [...inputs, answers];
    return again ? collectInputs(newInputs) : newInputs;
  };

  
const main = async () => {
    const inputs = await collectInputs();
    console.log(`the final results are ${inputs}`);
};
  
main();


