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
        this.role = "Manager"
    }
}

class Engineer extends Employee {
    constructor (name, id, email, github) {
        super (name, id, email);
        this.github = github;
        this.role = 'Engineer';
    }
}

class Intern extends Employee {
    constructor (name, id, email, school) {
        super (name, id, email);
        this.school = school;
        this.role = 'Intern';
    }
}

module.exports = {
    Manager: Manager, 
    Engineer: Engineer, 
    Intern: Intern}