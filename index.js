const inquirer = require("inquirer");
const employee = require('./constructor.js')


const collectInputs = async (inputs = []) => {
    // const prompts = [
    //   {
    //     type: 'input',
    //     name: 'inputValue',
    //     message: 'Enter some input: '
    //   },
    //   {
    //     type: 'confirm',
    //     name: 'again',
    //     message: 'Enter another input? ',
    //     default: true
    //   }
    // ];
    const prompts = [
        {
            type: 'input',
            name: 'name',
            message: 'What is their?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is their id?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their email?'
        },
    ]

    const managerPrompt = {
        type: 'input',
        name: 'phone',
        message: 'What is the office phone number?'
    }

    const engineerPrompt = {
        type: 'input',
        name: 'github',
        message: 'What is their github username?'
    }

    const internPrompt = {
        type: 'input',
        name: 'school',
        message: 'What school are the currently attending?'
    }

    const confirm = {
        type: 'list',
        name: 'again',
        message: 'Would you like to add another employee?',
        choices: ['Engineer', 'Intern', 'No']
    }

    let newPrompts = prompts
 
    if (!inputs) {
        console.log("Let's start by adding a manager:")
        newPrompts.push(managerPrompt).push(confirm)
    } 
    const { again, ...answers } = await inquirer.prompt(prompts);
    const newInputs = [...inputs, answers];
    return again ? collectInputs(newInputs) : newInputs;
  };
  
  const main = async () => {
    const inputs = await collectInputs();
    console.log(inputs);
  };
  
  main();


