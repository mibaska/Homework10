const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'yourRootPassword',
  database : 'cms_schema'
});
connection.connect(function(err){
    if(!err){
      console.log(`Connected to database thread: ${connection.threadId}`);
    }
});

inquirer
  .prompt({
    type: "list",
    name: "listAleph",
    message: "What would you like to do?",
    choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Remove Role", "View All Departments", "Add Department", "Remove Department", "End Program"]
  })
  .then(function(response) {
    if(response.listAleph === "View All Employees"){
      
    }else if(response.listAleph === "View All Employees By Department"){
      
    }else if(response.listAleph === "View All Employees By Manager"){
      
    }else if(response.listAleph === "Add Employee"){
      
    }else if(response.listAleph === "Remove Employee"){
      
    }else if(response.listAleph === "Update Employee Role"){
      
    }else if(response.listAleph === "Update Employee Manager"){
      
    }else if(response.listAleph === "View All Roles"){
      
    }else if(response.listAleph === "Add Role"){
      
    }else if(response.listAleph === "Remove Role"){
      
    }else if(response.listAleph === "View All Departments"){
      
    }else if(response.listAleph === "Add Department"){
      
    }else if(response.listAleph === "Remove Department"){
      
    }else{
      console.log("Fatal Error!");
    }
  });