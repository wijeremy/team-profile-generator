const inquirer = require("inquirer");
const employee = require('./constructor.js')
const prompt = require('./prompts')

const collectInputs = async (inputs = [], prompt) => {
    const selectEmployee = async (inputs = []) => {
        console.log(`So far we have ${inputs}`)
        const { role } = await inquirer.prompt(select);
        console.log(role)
        if (role === "Engineer"){
            console.log('So you want to add an engineer?')
            collectInputs(inputs, engineerPrompt)
        } else if (role === "Intern"){
            console.log('So you want to add an intern?')
            collectInputs(inputs, internPrompt)
        } else {
            console.log("here you goooooo")
            return inputs;
        }
    }
    console.log("Let's start with the manager:")
    let newPrompts = [...prompts, prompt, confirm]
    let { again, ...answers } = await inquirer.prompt(newPrompts);
    if (orompt === managerPrompt) {
        let manager = new employee.Manager(answers.name, answers.id, answers.email, answers.phone)
        let managerAdded = [...inputs, manager];
        return again ? selectEmployee(managerAdded) : managerAdded;
    } else if (prompt === engineerPrompt) {
        let engineer = new employee.Engineer(answers.name, answers.id, answers.email, answers.github);
        let engineerAdded = [...inputs, engineer];
        return again ? selectEmployee(engineerAdded) : engineerAdded;
    } else if (prompt === internPrompt) {
        let intern = new employee.Intern(answers.name, answers.id, answers.email, answers.school);
        let internAdded = [...inputs, intern];
        return again ? selectEmployee(internAdded) : internAdded;
    } else {
        console.log("here you go:")
        return inputs
    }  
    
};


  
  const main = async () => {
    const inputs = await collectInputs();
    console.log(`the final results are ${inputs}`);
  };
  
  main();


