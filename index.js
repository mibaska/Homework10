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
          res.forEach(emp => {
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
          res.forEach(dep => {
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
              res.forEach(empDep => {
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
        var manArray = [];
        connection.query("SELECT * FROM employee e LEFT JOIN role r ON e.role_id = r.id", function(err, res){
          if(err) throw err;
          console.log(res);
          res.forEach(man => {
            var manData = {
              firstName: man.first_name,
              lastName: man.last_name,
              role: man.title
            };
            if(manData.role === "Manager"){
              manArray.push(manData);
            }
          });
          inquirer
          .prompt({
            type: "list",
            name: "listGimel",
            message: "Which manager would you like to see?",
            choices: empArray
          })
          .then(function(response) {
            var empManArray = [];
            connection.query("SELECT * FROM employee e LEFT JOIN employee m ON e.manager_id = m.id", function(err, res){
              if(err) throw err;
              console.log(res);
              res.forEach(empMan => {
                var empManData = {
                  name: empMan.name
                };
                empManArray.push(empManData);
              });
              console.table(empManArray);
            });
          });
        });
      }else if(response.listAleph === "Add Employee"){
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is Employee's first name?",
              name: "firstname"
            },
            {
              type: "input",
              message: "What is Employee's last name?",
              name: "lastname"
            },
            {
              type: "input",
              message: "What is Employee's role id?",
              name: "roleid"
            },
            {
              type: "input",
              message: "What is Employee's Manager id?",
              name: "manid"
            }
          ])
          .then(function(response) {
            var employeeArray = response;
            connection.query("INSERT INTO employees (employeeArray) VALUES (?)", function(err, result) {
              if (err) throw err;
            });
          });
      }else if(response.listAleph === "Remove Employee"){
        var empArray = [];
        connection.query("SELECT * FROM employee e LEFT JOIN role r ON e.role_id = r.id", function(err, res){
          if(err) throw err;
          console.log(res);
          res.forEach(emp => {
            var empData = {
              id: emp.id,
              firstName: emp.first_name,
              lastName: emp.last_name,
              role: emp.title
            };
            empArray.push(empData);
          });
          inquirer
          .prompt({
            type: "list",
            name: "listDaleth",
            message: "Which employee would you like to remove?",
            choices: empArray
          })
          .then(function(response) {
            connection.query("DELETE FROM employees WHERE id = ?", function(err, result) {
              if (err) {
                return res.status(500).end();
              }
              else if (result.affectedRows === 0) {
                return res.status(404).end();
              }
              res.status(200).end();
          
            });
          });
        });
      }else if(response.listAleph === "Update Employee Role"){
        
      }else if(response.listAleph === "Update Employee Manager"){
        
      }else if(response.listAleph === "View All Roles"){
        connection.query("SELECT * FROM role", function(err, res){
          if(err) throw err;
          console.log(res);
          res.forEach(rol => {
            console.table({
              id: rol.id,
              title: rol.title,
              salary: rol.salary
            });
          });
        });
      }else if(response.listAleph === "Add Role"){
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the role?",
              name: "role"
            },
            {
              type: "input",
              message: "What is the role's salary?",
              name: "salary"
            }
          ])
          .then(function(response) {
            var roleArray = response;
            connection.query("INSERT INTO role (roleArray) VALUES (?)", function(err, result) {
              if (err) throw err;
            });
          });
      }else if(response.listAleph === "Remove Role"){
        var rolArray = [];
        connection.query("SELECT * FROM employee e LEFT JOIN role r ON e.role_id = r.id", function(err, res){
          if(err) throw err;
          console.log(res);
          res.forEach(rol => {
            console.table({
              id: rol.id,
              title: rol.title,
              salary: rol.salary
            });
            rolArray.push(rolData);
          });
          inquirer
          .prompt({
            type: "list",
            name: "listHe",
            message: "Which role would you like to remove?",
            choices: rolArray
          })
          .then(function(response) {
            connection.query("DELETE FROM role WHERE id = ?", function(err, result) {
              if (err) {
                return res.status(500).end();
              }
              else if (result.affectedRows === 0) {
                return res.status(404).end();
              }
              res.status(200).end();
          
            });
          });
        });
      }else if(response.listAleph === "View All Departments"){
        connection.query("SELECT * FROM department", function(err, res){
          if(err) throw err;
          console.log(res);
          res.forEach(dep => {
            console.table({
              id: dep.id,
              name: dep.name
            });
          });
        });
      }else if(response.listAleph === "Add Department"){
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the Department?",
              name: "department"
            }
          ])
          .then(function(response) {
            var departmentArray = response;
            connection.query("INSERT INTO role (departmentArray) VALUES (?)", function(err, result) {
              if (err) throw err;
            });
          });
      }else if(response.listAleph === "Remove Department"){
        var depArray = [];
        connection.query("SELECT * FROM employee e LEFT JOIN role r ON e.role_id = r.id", function(err, res){
          if(err) throw err;
          console.log(res);
          res.forEach(dep => {
            console.table({
              id: dep.id,
              name: dep.name
            });
          });
          inquirer
          .prompt({
            type: "list",
            name: "listHe",
            message: "Which role would you like to remove?",
            choices: depArray
          })
          .then(function(response) {
            connection.query("DELETE FROM department WHERE id = ?", function(err, result) {
              if (err) {
                return res.status(500).end();
              }
              else if (result.affectedRows === 0) {
                return res.status(404).end();
              }
              res.status(200).end();
          
            });
          });
        });
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
  res.forEach(emp => { // Error is here
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