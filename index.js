// Your code here
// Function to create an employee record
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records from an array of arrays
function createEmployeeRecords(employeesArray) {
    return employeesArray.map(createEmployeeRecord);
}

// Function to add a TimeIn event to an employee's record
function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employeeRecord;
}

// Function to add a TimeOut event to an employee's record
function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employeeRecord;
}

// Function to calculate hours worked on a given date
function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a given date
function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

// Function to calculate total wages for an employee
function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((total, event) =>
        total + wagesEarnedOnDate(employeeRecord, event.date), 0
    );
}

// Function to calculate total payroll for multiple employees
function calculatePayroll(employeesArray) {
    return employeesArray.reduce((total, employee) => total + allWagesFor(employee), 0);
}
