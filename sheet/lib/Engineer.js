const Employee = require("./Employee")

class Engineer extends Employee{
	constructor(name,id,email,Githubusername)
	{
		super(name,id,email);
		this.Githubusername = Githubusername;
	}

	getGithubusername(){
		return this.Githubusername;
	}

	getRole()
	{
		return "Engineer";
	}
}

module.exports = Engineer;