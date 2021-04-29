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

    function addDecimalPoint() {
        const decimalPointButton = document.querySelector('[value="."]');
        decimalPointButton.addEventListener('click', () => {
            const decimalPoint = ".";
            if (display.textContent === "" || display.textContent.indexOf('.') >= 1) {
                return;
            } else {
                display.textContent += decimalPoint;
            }
        });
    }

    function addSquare() {
        const squareButton = document.querySelector('[value="x²"]');
        squareButton.addEventListener('click', () => {
            if (display.textContent !== "") {
                display.textContent = Math.pow(display.textContent, 2);
            }
            if (!Number.isInteger(Number(display.textContent))) {
                display.textContent = Number(display.textContent).toFixed(2);
            }
        });
    }

    function storeUserInput() {
        const addButton = document.querySelector('[value="+"]');
        const addValue = addButton.getAttribute("value");
        const subButton = document.querySelector('[value="-"]');
        const multiplyButton = document.querySelector('[value="*"]');
        const divideButton = document.querySelector('[value="/"]');
        const resultButton = document.querySelector('[value="="]');

        let addOperation = addButton.addEventListener('click', () => {
            let result = display.textContent;
            if (display.textContent !== "") {
                display.textContent += addValue;
            }
            console.log(result);
            return result;
        });
        

        resultButton.addEventListener('click', () => {

        });
    }

    defineDigitsListener();
    resetCalculator();
    erase();
    ChangeToPosNeg();
    addDecimalPoint();
    addSquare();
    storeUserInput()
}
init();