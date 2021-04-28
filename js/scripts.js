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
            if (display.textContent.charAt(0) === "-") {
                display.textContent = display.textContent.substring(1);
            }
            else if (display.textContent === "") {
                return;
            } else {
                display.textContent = minus + display.textContent;
            }
        });
    }

    function addComma() {
        const commaButton = document.querySelector('[value=","]');
        commaButton.addEventListener('click', () => {
            const comma = ",";
            if (display.textContent === "" || display.textContent.indexOf(',') >= 1) {
                return;
            } else {
                display.textContent += comma;
            }
        });
    }

    function addSquare() {
        const squareButton = document.querySelector('[value="x²"]');
        squareButton.addEventListener('click', () => {
            if (display.textContent === "" || display.textContent === NaN) {
                return;
            }
            display.textContent = display.textContent * display.textContent;
        });
    }

    defineDigitsListener();
    resetCalculator();
    erase();
    ChangeToPosNeg();
    addComma();
    addSquare();
}
init();