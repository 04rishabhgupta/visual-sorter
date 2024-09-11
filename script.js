const barsContainer = document.getElementById('bars-container');
const startBtn = document.getElementById('start-btn');
const sortAlgorithmSelect = document.getElementById('sort-algorithm');
const speedControl = document.getElementById('speed-control');
const arraySizeInput = document.getElementById('array-size');

let speed = 100;  // Default speed in milliseconds

// Function to generate random bars based on the input size
function generateBars(numBars = 50) {
    barsContainer.innerHTML = '';  // Clear existing bars
    for (let i = 0; i < numBars; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${Math.floor(Math.random() * 100) + 20}px`;  // Random height between 20 and 120px
        barsContainer.appendChild(bar);
    }
}

// Function to swap two bars (their heights)
function swap(el1, el2) {
    let tempHeight = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = tempHeight;
}

// Set speed based on selection
function setSpeed() {
    const selectedSpeed = speedControl.value;
    if (selectedSpeed === 'slow') {
        speed = 300;
    } else if (selectedSpeed === 'fast') {
        speed = 10;
    } else {
        speed = 100;
    }
}

// Bubble Sort Algorithm
async function bubbleSort() {
    let bars = document.querySelectorAll('.bar');
    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            // Wait for visualization based on speed
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, speed)
            );

            if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                swap(bars[j], bars[j + 1]);
            }

            bars[j].style.backgroundColor = '#007bff';
            bars[j + 1].style.backgroundColor = '#007bff';
        }
        bars[bars.length - i - 1].style.backgroundColor = 'green';  // Mark sorted
    }
    bars[0].style.backgroundColor = 'green';  // Mark the first element as sorted
}

// Selection Sort Algorithm
async function selectionSort() {
    let bars = document.querySelectorAll('.bar');
    for (let i = 0; i < bars.length; i++) {
        let minIndex = i;
        bars[minIndex].style.backgroundColor = 'red';
        for (let j = i + 1; j < bars.length; j++) {
            bars[j].style.backgroundColor = 'yellow';

            // Wait for visualization based on speed
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, speed)
            );

            if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                bars[minIndex].style.backgroundColor = '#007bff';
                minIndex = j;
                bars[minIndex].style.backgroundColor = 'red';
            } else {
                bars[j].style.backgroundColor = '#007bff';
            }
        }

        if (minIndex !== i) {
            swap(bars[i], bars[minIndex]);
        }
        bars[minIndex].style.backgroundColor = '#007bff';
        bars[i].style.backgroundColor = 'green';  // Mark sorted element
    }
}

// Event listener for starting the sorting
startBtn.addEventListener('click', () => {
    const algorithm = sortAlgorithmSelect.value;
    setSpeed();  // Set the speed before starting sorting
    if (algorithm === 'bubble') {
        bubbleSort();
    } else if (algorithm === 'selection') {
        selectionSort();
    }
});

// Event listener for array size input and bar generation
arraySizeInput.addEventListener('input', () => {
    const arraySize = parseInt(arraySizeInput.value);
    if (arraySize > 0) {
        generateBars(arraySize);
    }
});

// Initial bar generation with default size
generateBars();
