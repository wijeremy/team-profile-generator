class Employee {
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
}

class Manager extends Employee {
    constructor (name, id, email, phone) {
        super (name, id, email);
        this.phone = phone;
    }
}

class Engineer extends Employee {
    constructor (name, id, email, github) {
        super (name, id, email);
        this.github = github;
    }
}

class Intern extends Employee {
    constructor (name, id, email, school) {
        super (name, id, email);
        this.school = school;
    }
}

module.exports = {
    Manager: Manager, 
    Engineer: Engineer, 
    Intern: Intern}