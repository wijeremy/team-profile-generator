const basePrompts = [
    {
        type: 'input',
        name: 'name',
        message: 'What is their name?'
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

const select = {
    type: 'list',
    name: 'nextRole',
    message: 'Enter another employee? ',
    choices: ['Engineer', 'Intern', 'No']
  }

module.exports = {
    basePrompts: basePrompts,
    managerPrompt: managerPrompt,
    engineerPrompt: engineerPrompt,
    internPrompt: internPrompt,
    select: select
}