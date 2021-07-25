const base = [
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

const confirm = {
    type: 'confirm',
    name: 'again',
    message: 'Would you like to add another employee?',
    default: true
}

const select = {
    type: 'list',
    name: 'role',
    message: 'What role would you like to add?',
    choices: ['Engineer', 'Intern']

}

module.exports = {
    base: base,
    managerPrompt: managerPrompt,
    engineerPrompt: engineerPrompt,
    internPrompt: internPrompt,
    confirm: confirm,
    select: select
}