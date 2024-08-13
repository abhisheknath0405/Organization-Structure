import React,  {useState} from "react";

const UpdateSalary = ({ manager }) => {
  const [salaryChanges, setSalaryChanges] = useState({});

  const handleSalaryChange = (employeeId, newSalary) => {
    setSalaryChanges({
      ...salaryChanges,
      [employeeId]: newSalary,
    });
  };

  const calculateBudgetChange = () => {
    return Object.entries(salaryChanges).reduce(
      (totalChange, [id, newSalary]) => {
        const employee = manager.directReports.find(
          (emp) => emp.id === parseInt(id)
        );
        return totalChange + (newSalary - employee.salary);
      },
      0
    );
  };

  const handleSubmit = () => {
    Object.entries(salaryChanges).forEach(([id, newSalary]) => {
      const employee = manager.directReports.find(
        (emp) => emp.id === parseInt(id)
      );
      employee.salary = newSalary;
    });
    alert(`Total budget change: $${calculateBudgetChange()}`);
  };

  return (
    <div>
      <h2>Update Salaries for {manager.name}'s Department:</h2>
      {manager.directReports.map((employee) => (
        <div key={employee.id}>
          <label>{employee.name}: </label>
          <input
            type="number"
            defaultValue={employee.salary}
            onChange={(e) =>
              handleSalaryChange(employee.id, parseInt(e.target.value))
            }
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Update Salaries</button>
    </div>
  );
};

export default UpdateSalary;
