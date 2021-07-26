const inquirer = require("inquirer");
const { Manager, Engineer, Intern } = require('./constructor.js')
const { base, managerPrompt, engineerPrompt, internPrompt, select } = require('./prompts')

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
    const setRole = (currentPrompt) => {
        if (currentPrompt === managerPrompt){
            return new Manager(...Object.values(answers))
        } else if (currentPrompt === engineerPrompt){
            return new Engineer(...Object.values(answers))
        } else if (currentPrompt === internPrompt){
            return new Intern(...Object.values(answers))
        } else {
            return answers
        }
    }
    const newEmployee = setRole(myPrompt)
    const newInputs = [...inputs, newEmployee];
    const getNextPrompt = (roleName) => {
        if (roleName === 'Engineer'){
            return engineerPrompt
        } else if (roleName === 'Intern') {
            return internPrompt
        } else {
            return false
        }
    };
    const nextPrompt = getNextPrompt(nextRole);
    return nextPrompt ? collectInputs(newInputs, nextPrompt) : newInputs;
};
 
const main = async () => {
    const inputs = await collectInputs();
    console.log(inputs)
};
  
main();


