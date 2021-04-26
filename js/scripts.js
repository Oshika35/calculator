function init() {
    const display = document.querySelector(".display__text");

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
        digits.forEach((digit) => {
            const digitValue = digit.getAttribute("value");
            digit.addEventListener('click', () => {
                display.textContent += digitValue;
            });
        });
    }

    function resetCalculator() {
        const resetButton = document.querySelector(".account-current");
        resetButton.addEventListener('click', () => display.textContent = "")
    }

    function erase() {
        const erase = document.querySelector('[value="Erase"]');
        const displayText = display.textContent;
        erase.addEventListener('click', () => {
            console.log(displayText);
            displayText.substring(1);
        })
    }

    defineDigitsListener();
    resetCalculator();
    erase();
}
init();