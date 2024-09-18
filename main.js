const container = document.getElementById('grid-container');
const resizeBtn = document.getElementById('resize-btn');

// Function to create the grid
function createGrid(size) {
  container.innerHTML = ''; // Clear the container

  // Calculate the size of each cell
  const cellSize = 700 / size; // Size of each cell in px

  // Create the grid divs
  for (let i = 1; i <= size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-item'); // Assign the grid-item class
    square.style.width = `${cellSize}px`; // Set the width of the cell
    square.style.height = `${cellSize}px`; // Set the height of the cell
    
    // Initial color (no color)
    square.style.backgroundColor = 'rgb(255, 255, 255)'; // Start with white

    // Add event listener to assign color and darken the cell
    square.addEventListener('mouseenter', () => {
      darkenSquare(square); // Darken the cell when the mouse hovers over it
    });

    container.appendChild(square); // Append to the container
  }
}

// Function to darken the color of the div
function darkenSquare(square) {
  // Get the current color of the cell
  let currentColor = window.getComputedStyle(square).backgroundColor;

  // Extract the current RGB values
  let rgbValues = currentColor.match(/\d+/g).map(Number); // Extract r, g, b values

  // If the cell is still white (no color assigned), assign a random color
  if (rgbValues[0] === 255 && rgbValues[1] === 255 && rgbValues[2] === 255) {
    const randomColor = getRandomColor();
    square.style.backgroundColor = randomColor;
  } else {
    // If it already has a color, darken it by reducing the RGB values
    let darkerRGB = rgbValues.map(value => Math.max(0, value - 25)); // Reduce values to make it darker
    square.style.backgroundColor = `rgb(${darkerRGB[0]}, ${darkerRGB[1]}, ${darkerRGB[2]})`;
  }
}

// Function to generate a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to change the grid size
function promptForGridSize() {
  let size = parseInt(prompt("Enter the number of cells per side (max 100):"));

  if (isNaN(size) || size < 16 || size > 100) {
    alert("Please enter a number between 16 and 100.");
  } else {
    createGrid(size);
  }
}

// Create a 16x16 grid when the page loads
createGrid(16);

// Add an event to the button to change the grid size
resizeBtn.addEventListener('click', promptForGridSize);
