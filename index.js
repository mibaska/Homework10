const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql");

function getInOrder(){
  inquirer
    .prompt({
      type: "list",
      name: "listAleph",
      message: "What would you like to do?",
      choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Remove Role", "View All Departments", "Add Department", "Remove Department", "End Program"]
    })
    .then(function(response) {
      if(response.listAleph === "View All Employees"){
        var empArray = [];
        connection.query("SELECT * FROM employee", function(err, res){
          if(err) throw err;
          console.log(res);
          res.array.forEach(emp => {
            var empData = {
              id: emp.id,
              lastName: emp.last_name,
              firstName: emp.first_name
            };
            empArray.push(empData);
          });
          console.table(empArray);
        });
      }else if(response.listAleph === "View All Employees By Department"){
        var depArray = [];
        connection.query("SELECT * FROM department", function(err, res){
          if(err) throw err;
          console.log(res);
          res.array.forEach(dep => {
            var depData = {
              name: dep.name
            };
            depArray.push(depData);
          });
          inquirer
          .prompt({
            type: "list",
            name: "listBeth",
            message: "Which department would you like to see?",
            choices: depArray
          })
          .then(function(response) {
            var empDepArray = [];
            connection.query("SELECT * FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id WHERE d.name = ?", function(err, res){
              if(err) throw err;
              console.log(res);
              res.array.forEach(empDep => {
                var empDepData = {
                  name: empDep.name
                };
                empDepArray.push(empDepData);
              });
              console.table(empDepArray);
            });
          });
        });
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
}

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'yourRootPassword',
  database : 'cms_db'
});
connection.connect(function(err){
    if(!err){
      console.log(`Connected to database thread: ${connection.threadId}`);
    }
});

connection.query("SELECT * FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id", function(err, res){
  if(err) throw err;
  console.log(res);
  res.array.forEach(emp => {
    console.table({
      id: emp.id,
      lastName: emp.last_name,
      firstName: emp.first_name,
      role: emp.title,
      department: emp.name
    });
  });
  getInOrder();
});