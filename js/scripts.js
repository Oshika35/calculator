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
        const eraseButton = document.querySelector('[value="Erase"]');
        eraseButton.addEventListener('click', () => {
            display.textContent = display.textContent.slice(0, -1);
        })
    }

    function ChangeToPosNeg() {
        const PosNegButton = document.querySelector('[value="+/-"]');
        PosNegButton.addEventListener('click', () => {
            const minus = "-";
            if(display.textContent.charAt(0) === "-") {
                display.textContent = display.textContent.substring(1);
            } else {
                display.textContent = minus + display.textContent;
            }
        });
    }

    defineDigitsListener();
    resetCalculator();
    erase();
    ChangeToPosNeg();
}
init();