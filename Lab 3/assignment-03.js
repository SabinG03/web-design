/* 
    Assigmnet 3
    Sabin Ghet
    22499834

    Windows - Chrome
    
*/

//--------------------------------------------------------------------------------
//                        ContentLoaded Event Listener
//--------------------------------------------------------------------------------
// This event listener is triggered.
// It initializes variables, applies initial styling, and sets up event listeners
// for input, focusout, click, and cycle actions.
// Apply yellow background color to input cells
//--------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  const table = document.querySelector('.Main table');
  const averageButton = document.querySelector('.Main button');
  const addColumnButton = document.querySelector('.Col-button-plus');
  const rowButton = document.querySelector('.Row-button-plus');
  const cycleButton = document.querySelector('.cycle');
  const totalAverageCell = document.querySelector('.total-average');

  let assignmentNumber = 5;
  let gradingSystem = 'percent';

  applyYellowToInputCells();

  //--------------------------------------------------------------------------------
  //      Event listeners for input, focusout, click, and cycle actions
  //--------------------------------------------------------------------------------
  // Input Event Listener
  // Add input event listener to table
  // Validate input and calculate average when input changes
  table.addEventListener('input', function(event) {
    const input = event.target;
    if (input.tagName === 'INPUT') {
      validateInput(input);
      calculateAverage(input.parentNode.parentNode);
      input.classList.remove('yellow');
    }
  });

  //--------------------------------------------------------------------------------
  //                              Focusout Event Listener
  //--------------------------------------------------------------------------------
  // Add focusout event listener to table
  // Round grades when focus moves away from input field

  table.addEventListener('focusout', function(event) {
    const input = event.target;
    if (input.tagName === 'INPUT') {
      roundGrade(input);
    }
  });

  //--------------------------------------------------------------------------------
  //                           Click Event Listeners
  //--------------------------------------------------------------------------------
  // Add click event listener to Average button
  // Calculate average for all rows when Average button is clicked
  // Add click event listener to Add Column button
  // Add a new column to the table and update averages
  // Add click event listener to Row button
  // Add a new row to the table
  // Add click event listener to Cycle button
  // Toggle grading system and recalculate averages for all rows

  averageButton.addEventListener('click', function() {
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => calculateAverage(row));
  });
  addColumnButton.addEventListener('click', function() {
    addColumn();
    updating();
  });
  rowButton.addEventListener('click', function() {
    addRow();
  });
  cycleButton.addEventListener('click', function() {
    toggleGradingSystem();
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => calculateAverage(row));
  });

  //--------------------------------------------------------------------------------
  //                    Toggle Grading System Function
  //--------------------------------------------------------------------------------
  // This function toggles between different grading systems: percent, letter, and
  // four-point scale.
  //--------------------------------------------------------------------------------

  function toggleGradingSystem() {
    if (gradingSystem === 'percent') {
      gradingSystem = 'letter';
    } else if (gradingSystem === 'letter') {
      gradingSystem = 'fourPoint';
    } else {
      gradingSystem = 'percent';
    }
  }

//--------------------------------------------------------------------------------
//                       Calculate Average Function
//--------------------------------------------------------------------------------
// Calculates the average score for a row and updates the corresponding cell in the table.
// It iterates through the input fields in the row, adding valid scores and counting them.
// Then, it calculates the average based on the grading system and updates the average cell's content.
// Styling is applied to the average cell based on the grading system and score.
// Calculate the average based on the grading system.
// Update the average cell's content and apply styling based on the grading system and score.
//--------------------------------------------------------------------------------

  function calculateAverage(row) {
    const inputs = row.querySelectorAll('input[type="text"]');
    let sum = 0;
    let count = 0;
    let hasScore = false;
    inputs.forEach((input, index) => {
      if (index < assignmentNumber && !input.parentNode.classList.contains('deleted-column')) {
        let value = parseFloat(input.value) || 0;
        if (value < 0 || value > 100) {
          value = 0;
          input.value = '';
        }
        sum += value;
        count++;
        if (value > 0) hasScore = true;
      }
    });
    if (!hasScore) return;
    let average;
    switch (gradingSystem) {
      case 'percent':
        average = count > 0 ? Math.ceil(sum / count) : 0;
        break;
      case 'letter':
        average = calculateLetterGrade(sum / count);
        break;
      case 'fourPoint':
        average = calculateFourPointGrade(sum / count).toFixed(1);
        break;
      default:
        average = 0;
    }
    const averageCell = row.querySelector('td:last-of-type');
    averageCell.textContent = average;

    if ((gradingSystem === 'percent' && average <= 60 && hasScore) ||
      (gradingSystem === 'letter' && average === 'F') ||
      (gradingSystem === 'fourPoint' && average === '0.0')) {
      averageCell.classList.add('red');
      averageCell.classList.add('white-font');
    } else {
      averageCell.classList.remove('red');
      averageCell.classList.remove('white-font');
    }
    averageCell.classList.add('right');
  }

  //--------------------------------------------------------------------------------
  //                       Calculate Letter Grade Function
  //--------------------------------------------------------------------------------
  // This function calculates the letter grade based on the given percentage score.
  //--------------------------------------------------------------------------------

  function calculateLetterGrade(percentage) {
    if (percentage >= 93) return 'A';
    else if (percentage >= 90) return 'A-';
    else if (percentage >= 87) return 'B+';
    else if (percentage >= 83) return 'B';
    else if (percentage >= 80) return 'B-';
    else if (percentage >= 77) return 'C+';
    else if (percentage >= 73) return 'C';
    else if (percentage >= 70) return 'C-';
    else if (percentage >= 67) return 'D+';
    else if (percentage >= 63) return 'D';
    else if (percentage >= 60) return 'D-';
    else return 'F';
  }

  //--------------------------------------------------------------------------------
  //                    Calculate Four Point Grade Function
  //--------------------------------------------------------------------------------
  // This function calculates the grade on a four-point scale based on the given
  // percentage score.
  //--------------------------------------------------------------------------------

  function calculateFourPointGrade(percentage) {
    if (percentage >= 93) return 4.0;
    else if (percentage >= 90) return 3.7;
    else if (percentage >= 87) return 3.3;
    else if (percentage >= 83) return 3.0;
    else if (percentage >= 80) return 2.7;
    else if (percentage >= 77) return 2.3;
    else if (percentage >= 73) return 2.0;
    else if (percentage >= 70) return 1.7;
    else if (percentage >= 67) return 1.3;
    else if (percentage >= 63) return 1.0;
    else if (percentage >= 60) return 0.7;
    else return 0.0;
  }

  //--------------------------------------------------------------------------------
  //                        Validate Input Function
  //--------------------------------------------------------------------------------
  // This function validates the input by allowing only numbers and decimal points
  // for input cells other than student name and ID.
  //--------------------------------------------------------------------------------

  function validateInput(input) {
    const cellIndex = input.parentNode.cellIndex;
    if (cellIndex >= 2) { 
      input.value = input.value.replace(/[^0-9.]/g, '');
    }
  }

  //--------------------------------------------------------------------------------
  //                           Round Grade Function
  //--------------------------------------------------------------------------------
  // This function rounds the grade to the nearest integer.
  
  function roundGrade(input) {
    const value = parseFloat(input.value) || 0;
    const roundedValue = Math.round(value);
    input.value = roundedValue;
  }

//--------------------------------------------------------------------------------
//                            Add New Column Function
//--------------------------------------------------------------------------------
//This function adds a new column to the table, updating assignment numbers and 
//applying necessary listeners.
// Increment the assignment number 
// Get all rows in the table
// Array to store input cells for the new assignment
// Give it the attributes
// If it's the header row, update the header with the new assignment number

function addColumn() {
  assignmentNumber++; 
  const rows = table.querySelectorAll('tr');
  const assignmentCells = []; 

  rows.forEach((row, index) => {
    const newCell = document.createElement('td'); 
    const newInput = document.createElement('input'); 
    newInput.type = 'text';
    newInput.name = `Assignment ${assignmentNumber}`;    
    newInput.className = 'right yellow'; 
    newInput.placeholder = '-';
    newCell.appendChild(newInput);

//--------------------------------------------------------------------------------
// Get the last cell (average cell)
// Get the last header cell
// Gives it the text
// Insert it to be before the Average section 
    // If it's not the header row
    // Insert the new cell before the last cell
     // Push the new input to the assignmentCells array

    if (index === 0) {
      const averageCell = row.querySelector('td:last-of-type'); 
      const averageHeading = row.querySelector('th:last-of-type');
      const newHeading = document.createElement('th'); 
      newHeading.textContent = `Assignment ${assignmentNumber}`;
      row.insertBefore(newHeading, averageHeading);
    } else { 
      row.insertBefore(newCell, row.lastElementChild); 
      assignmentCells.push(newInput);
    }
  });
}

//--------------------------------------------------------------------------------
//                              Add New Row Function
//--------------------------------------------------------------------------------
// This function adds a new row to the table with input fields for student name,
// ID, and assignment scores.
// Create a new row element
// Create cells for student name and ID and give attributes
// Append name and ID cells to the new row
// Add input cells for assignment scores and give attributes
// Add input event listener for validation (skip for name and ID cells)
// Create the average cell for the new row
// Attaches the newly created input field to the new cell.
// Attaches the new cell (containing the input field) to the new row.

function addRow() {
  const newRow = document.createElement('tr');
  
  const nameCell = document.createElement('td');
  nameCell.classList.add('no-yellow');
  nameCell.contentEditable = true;
  const idCell = document.createElement('td');
  idCell.classList.add('no-yellow');
  idCell.contentEditable = true;
  nameCell.textContent = '';
  idCell.textContent = '';
  
  newRow.appendChild(nameCell);
  newRow.appendChild(idCell);

  for (let i = 0; i < assignmentNumber; i++) {
    const newCell = document.createElement('td');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = `Assignment ${i + 1}`;
    newInput.className = 'right yellow'; 
    newInput.placeholder = '-';

    if (i >= 2) {
      newInput.addEventListener('input', function(event) {
        validateInput(event.target); 
      });
    }

    newCell.appendChild(newInput);
    newRow.appendChild(newCell);
  }
  const averageCell = document.createElement('td');
  averageCell.textContent = '';
  averageCell.classList.add('right');
  newRow.appendChild(averageCell);
  table.appendChild(newRow);
}

  //--------------------------------------------------------------------------------
  //                    Applying Yellow To Input Cells Function
  //--------------------------------------------------------------------------------
  // This function applies a yellow background color to input cells.
  //--------------------------------------------------------------------------------

  function applyYellowToInputCells() {
    const inputCells = table.querySelectorAll('input[type="text"]');
    inputCells.forEach(cell => {
      if (!cell.parentNode.classList.contains('no-yellow')) {
        cell.classList.add('yellow');
      }
    });
  }

  //--------------------------------------------------------------------------------
  //                              DeleteColumn Function
  //--------------------------------------------------------------------------------
  // This function deletes a column from the table and updates the assignment numbers.
  //--------------------------------------------------------------------------------

  function deleteColumn(columnIndex) {
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
      row.removeChild(row.cells[columnIndex]);
    });
    const headers = table.querySelectorAll('th');
    headers.forEach(header => {
      if (!header.classList.contains('delete')) {
        const assignmentNumber = parseInt(header.textContent.split(' ')[1]);
        if (assignmentNumber > columnIndex) {
          header.textContent = `Assignment ${assignmentNumber - 1}`;
        }
      }
    });
    updating();
  }

  //--------------------------------------------------------------------------------
  //                    Table Click Event Listeners
  //--------------------------------------------------------------------------------
  // Add click event listener to table headers for deleting columns

  table.addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName === 'TH' && target !== table.querySelector('th:first-of-type') && target.textContent.startsWith('Assignment')) {
      const columnIndex = target.cellIndex;
      deleteColumn(columnIndex);
    }
  });

  //--------------------------------------------------------------------------------
  //                          updating Function
  //--------------------------------------------------------------------------------
  // This function updates the averages for all rows in the table.
  //--------------------------------------------------------------------------------

  function updating() {
    const rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      calculateAverage(row);
    }
  }
});
