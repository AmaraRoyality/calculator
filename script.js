// Select the display element
const display = document.getElementById("display");

// Append numbers to the display
function appendNumber(number) {
    display.value = display.value === "0" || display.value === "Error" ? number : display.value + number;
}

// Append operators to the display
function appendOperator(operator) {
    if (display.value !== "" && !isOperatorAtEnd(display.value)) {
        display.value += ` ${operator} `;
    }
}

// Clear the display
function clearDisplay() {
    display.value = "";
}

// Delete the last character from the display
function deleteLast() {
    if (display.value) {
        display.value = display.value.trimEnd().slice(0, -1).trimEnd();
    }
}

// Evaluate the current input
function calculate() {
    try {
        const result = Function(`'use strict'; return (${sanitizeInput(display.value)})`)();
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}

// Perform scientific calculations
function calculateScientific(func) {
    try {
        const value = parseFloat(display.value) || 0;
        const operations = {
            sqrt: Math.sqrt,
            sin: (x) => Math.sin(x * Math.PI / 180), // Converts to radians
            cos: (x) => Math.cos(x * Math.PI / 180), // Converts to radians
            tan: (x) => Math.tan(x * Math.PI / 180), // Converts to radians
            log: Math.log10,
            ln: Math.log,
            exp: Math.exp,
        };

        if (operations[func]) {
            display.value = operations[func](value);
        } else {
            display.value = "Error";
        }
    } catch (error) {
        display.value = "Error";
    }
}

// Sanitize input to allow only valid expressions
function sanitizeInput(input) {
    return input.replace(/[^-()\d/*+.\s]/g, "");
}

// Check if an operator is at the end of the display value
function isOperatorAtEnd(value) {
    return /[\+\-\*\/]\s*$/.test(value);
}
