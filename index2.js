const inquirer = require("inquirer");
const employee = require('./constructor.js')
const promptsFile = require('./prompts')
const { base, managerPrompt, engineerPrompt, internPrompt, select } = promptsFile

const collectInputs = async (inputs = [], rolePrompt) => {
    const getPrompt = (promptName) => {
        if (!promptName) {
            return managerPrompt;
        } else {
            return rolePrompt;
        }
    }
    const myPrompt = getPrompt(rolePrompt);
    const myPrompts = [...base, myPrompt, select];
    const { nextRole, ...answers } = await inquirer.prompt(myPrompts);
    const getNextPrompt = (roleName) => {
        if (roleName === 'Engineer'){
            return engineerPrompt
        } else if (roleName === 'Intern') {
            return internPrompt
        } else {
            return false
        }
    }
    const nextPrompt = getNextPrompt(nextRole);
    const newInputs = [...inputs, answers];
    return nextPrompt ? collectInputs(newInputs, nextPrompt) : newInputs;
};

  
const main = async () => {
    const inputs = await collectInputs();
    console.log(inputs)
};
  
main();


