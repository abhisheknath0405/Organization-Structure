import React from "react";

const EmployeeList = ({ employees }) => {
  const renderEmployee = (employee) => (
    <div key={employee.emp_id}>
      <strong>{employee.name}</strong> ({employee.role})
      {employee.reports.length > 0 && (
        <ul>
          {employee.reports.map((report) => (
            <li key={report.emp_id}>{report.name}</li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div>
      <h2>Organizational Hierarchy</h2>
      {employees.map(renderEmployee)}
    </div>
  );
};

// ({ manager }) => {
//     return (
//       <div>
//         <h2>Employees reporting to {manager.name}:</h2>
//         <ul>
//           {manager.directReports.map((employee) => (
//             <li key={employee.id}>{employee.name} ({employee.role})</li>
//           ))}
//         </ul>
//       </div>
//     );
// }

export default EmployeeList;
