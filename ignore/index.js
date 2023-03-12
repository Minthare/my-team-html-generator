const inquirer = require('inquirer')
const fs = require('fs')

const Manager = require('./lib/Manager.js')
const Engineer = require('./lib/Engineer.js')
const Intern = require('./lib/Intern.js')
const htmltemplate = require('./htmltemplate')




teamArray=[];

const managerquestions = [
{
      type: 'input',
      message: 'Enter Manager Name : ',
      name: 'managername',
},
{
	  type: 'input',
      message: 'Enter Manager ID : ',
      name: 'managerid',
},
{
	  type: 'input',
      message: 'Enter Manager Email : ',
      name: 'manageremail',
},
{
	  type: 'input',
      message: 'Enter Manager Office Number : ',
      name: 'managerofficenumber',
},
{
	type:'list',
	message:'Who would you like to add in your team? : ',
	name : 'option',
	choices : ['Engineer','Intern','No more members']
},


]

function createHtml(){

	console.log(teamArray)
	fs.writeFileSync('./team.html', htmltemplate(teamArray), "UTF-8")

	//fs.writeFileSync('./team.html',htmltemplate(teamArray),"UTF-8")
	//console.log(teamArray)
}

function addIntern()
{
	const internquestions = [
	{
	      type: 'input',
	      message: 'Enter Intern Name : ',
	      name: 'internname',
	},
	{
		  type: 'input',
	      message: 'Enter Intern ID : ',
	      name: 'internid',
	},
	{
		  type: 'input',
	      message: 'Enter Intern Email : ',
	      name: 'internemail',
	},
	{
		  type: 'input',
	      message: 'Enter Intern School : ',
	      name: 'internschool',
	},
	{
		type:'list',
		message:'Add more members? : ',
		name : 'option',
		choices : ['Engineer','Intern','No more members']
	},
	]

	inquirer.prompt(internquestions)
	.then((response)=>{
		const i = new Intern(response.internname,response.internid,response.internemail,response.internschool)
		teamArray.push(i)
		if (response.option == "Engineer")
		{
			addEngineer()
		}
		else if (response.option == "Intern")
		{
			addIntern()
		}
		else
		{
			createHtml()
		}
	})
}

function addEngineer()
{
	const engineerquestions = [
{
      type: 'input',
      message: 'Enter Engineer Name : ',
      name: 'engineername',
},
{
	  type: 'input',
      message: 'Enter Engineer ID : ',
      name: 'engineerid',
},
{
	  type: 'input',
      message: 'Enter Engineer Email : ',
      name: 'engineeremail',
},
{
	  type: 'input',
      message: 'Enter Engineer Username : ',
      name: 'engineergithub',
},
{
	type:'list',
	message:'Add more members? : ',
	name : 'option',
	choices : ['Engineer','Intern','No more members']
},


]

	inquirer.prompt(engineerquestions)
	.then((response)=>{
		const e = new Engineer(response.engineername,response.engineerid,response.engineeremail,response.engineergithub)
		teamArray.push(e)

		if (response.option == "Engineer")
		{
			addEngineer()
		}
		else if (response.option == "Intern")
		{
			addIntern()
		}
		else
		{
			createHtml()
		}
	})
}

function start() {
	inquirer.prompt(managerquestions)
	.then((response)=>{
		const m = new Manager(response.managername,response.managerid,response.manageremail,response.managerofficenumber)
		teamArray.push(m)
		console.log(teamArray)

		if (response.option == "Engineer"){
			addEngineer()
		}
		else if (response.option == "Intern")
		{
			addIntern()
		}
		else
		{
			createHtml()
		}
		

})
}

// Function call to initialize app
start();
