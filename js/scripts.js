function add(myArray) {
    return myArray.reduce((x, y) => x + y, 0);
}

function substract(myArray) {
    return myArray.reduce((x, y) => x - y, 0);
}

function multiply(myArray) {
    return myArray.reduce((x, y) => x * y, 1);
}

function divide(myArray) {
    return myArray.reduce((x, y) => x / y);
}

function operate(x, operator, y) {
    if (operator === "+") {
        add(x, y);
    }
    else if (operator === "-") {
        substract(x, y);
    }
    else if (operator === "*") {
        multiply(x, y);
    }
    else if (operator === "/") {
        divide(x, y);
    }
}

function defineDigitsListener() {
    const digits = document.querySelectorAll(".digit");
    const display = document.querySelector(".display__text");
    digits.forEach((digit) => {
        const digitValue = digit.getAttribute("value");
        digit.addEventListener('click', () => {
            display.textContent += digitValue;
        });
    });
}
defineDigitsListener();