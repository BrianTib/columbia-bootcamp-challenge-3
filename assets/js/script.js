// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');
const employeeTable = document.querySelector('#employee-table');

// Collect employee data
const collectEmployees = function() {
  const validateSalaryOrDefault = (input) => {
    input = parseFloat(input);
    // Default to 0 for invalid input
    if (isNaN(input) || input <= 0) { return 0; }
    return input;
  }

  // Initialize an empty array to store employee objects
  const employees = [];

  let addingEmployees = true;
  while (addingEmployees) {
    const firstName = prompt("Enter the employee's first name:").trim();
    const lastName = prompt("Enter the employee's last name:").trim();
    const salary = validateSalaryOrDefault(prompt("Enter the employee's salary:"));

    employees.push({ firstName, lastName, salary });
    addingEmployees = confirm('Do you want to add another employee?');
  }

  return employees;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  const totalSalary = employeesArray.reduce((acc, employee) => acc + employee.salary, 0);
  const averageSalary = totalSalary / employeesArray.length;

  console.log(`The average salary of all employees is: ${averageSalary.toLocaleString("en-US",{
    style:"currency",
    currency:"USD"
  })}`);
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // TODO: Select and display a random employee
  const randomEmployee = employeesArray[Math.floor(Math.random() * employeesArray.length)];
  console.log('Random Employee:', randomEmployee);
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort((a,b) => a.lastName.localeCompare(b.lastName));
  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
