import React from 'react'

const SalaryList = ({ manager }) => {
    return (
      <div>
        <h2>Salaries of employees reporting to {manager.name}:</h2>
        <ul>
          {manager.directReports.map((employee) => (
            <li key={employee.id}>{employee.name}: ${employee.salary}</li>
          ))}
        </ul>
      </div>
    );
}

export default SalaryList