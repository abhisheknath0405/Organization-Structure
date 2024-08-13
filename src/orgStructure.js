// Employee Node Structure
export class Employee {
    constructor(id, name, role, salary, manager = null) {
      this.id = id;
      this.name = name;
      this.role = role;
      this.salary = salary;
      this.manager = manager;
      this.directReports = [];
    }
  
    // Add direct report to this employee
    addDirectReport(employee) {
      this.directReports.push(employee);
      employee.manager = this;
    }
  }
  
  // Organization Structure
  export class Organization {
    constructor() {
      this.employees = new Map(); // key: id, value: Employee instance
    }
  
    addEmployee(employee) {
      this.employees.set(employee.id, employee);
    }
  
    getEmployee(id) {
      return this.employees.get(id);
    }

    getAllEmployees() {
        return Array.from(this.employees.values());
      }
  }

  export function findMaxNumberOfDirectReports(org) {
    let maxReports = 0;
    let employeeWithMaxReports = null;
  
    for (const employee of org.employees.values()) {
      if (employee.directReports.length > maxReports) {
        maxReports = employee.directReports.length;
        employeeWithMaxReports = employee;
      }
    }
  
    return employeeWithMaxReports;
  }
  
  export function findCommonManager(employee1, employee2) {
    const pathToRoot = (employee) => {
      const path = [];
      while (employee) {
        path.push(employee);
        employee = employee.manager;
      }
      return path.reverse();
    };
  
    const path1 = pathToRoot(employee1);
    const path2 = pathToRoot(employee2);
  
    let i = 0;
    while (i < path1.length && i < path2.length && path1[i] === path2[i]) {
      i++;
    }
  
    return path1[i - 1];
  }
  