// App.js

import React, { useState, useEffect } from "react";
import {
  Employee,
  Organization,
  findMaxNumberOfDirectReports,
  findCommonManager,
} from "./orgStructure";
import EmployeeList from "./component/EmployeeList";
import SalaryList from "./component/SalaryList";
import UpdateSalary from "./component/UpdateSalary";

const App = () => {
  const [org, setOrg] = useState(null);
  const [maxDirectReportsEmployee, setMaxDirectReportsEmployee] =
    useState(null);
  const [commonManager, setCommonManager] = useState(null);
  const [allEmployees, setAllEmployees] = useState([]);

  useEffect(() => {
    // Initialize organization and add employees
    const organization = new Organization();

    // Create employees
    const ceo = new Employee(1, "Alice", "CEO", 300000);
    const vpEngineering = new Employee(2, "Bob", "VP of Engineering", 200000);
    const engineeringManager = new Employee(
      3,
      "Charlie",
      "Engineering Manager",
      150000
    );
    const engineer = new Employee(4, "David", "Software Engineer", 120000);

    // Build the hierarchy
    ceo.addDirectReport(vpEngineering);
    vpEngineering.addDirectReport(engineeringManager);
    engineeringManager.addDirectReport(engineer);

    // Add employees to the organization
    organization.addEmployee(ceo);
    organization.addEmployee(vpEngineering);
    organization.addEmployee(engineeringManager);
    organization.addEmployee(engineer);

    // Set the organization state
    setOrg(organization);

    // Find the employee with the most direct reports
    const maxReportsEmployee = findMaxNumberOfDirectReports(organization);
    setMaxDirectReportsEmployee(maxReportsEmployee);

    // Find common manager for two employees (example: engineer and vpEngineering)
    const commonMgr = findCommonManager(engineer, vpEngineering);
    setCommonManager(commonMgr);
    // Get all employees and set state
    setAllEmployees(organization.getAllEmployees());
  }, []);

  if (!org) {
    return <div>Loading organization data...</div>;
  }

  return (
    <div>
      <h1>Organization Structure</h1>
      <EmployeeList manager={org.getEmployee(2)} />
      <SalaryList manager={org.getEmployee(2)} />
      <UpdateSalary manager={org.getEmployee(2)} />

      {maxDirectReportsEmployee && (
        <div>
          <h2>Employee with the Most Direct Reports:</h2>
          <p>
            {maxDirectReportsEmployee.name} ({maxDirectReportsEmployee.role})
          </p>
        </div>
      )}

      {commonManager && (
        <div>
          <h2>Common Manager for Engineer and VP of Engineering:</h2>
          <p>
            {commonManager.name} ({commonManager.role})
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
