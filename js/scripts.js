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

    function inputsEventListener() {
        const digits = document.querySelectorAll(".digit");
        const eraseButton = document.querySelector('[value="Erase"]');
        const resetButton = document.querySelector(".account-current");
        const posNegButton = document.querySelector('[value="+/-"]');
        const decimalPointButton = document.querySelector('[value="."]');
        const squareButton = document.querySelector('[value="x²"]');

        digits.forEach((digit) => {
            digit.addEventListener('click', () => {
                display.textContent += digit.getAttribute("value");
            });
        });

        eraseButton.addEventListener('click', erase);
        resetButton.addEventListener('click', resetCalculator);
        posNegButton.addEventListener('click', changeToPosNeg);
        decimalPointButton.addEventListener('click', addDecimalPoint);
        squareButton.addEventListener('click', addSquare);
    }

    function resetCalculator() {
        display.textContent = "";
    }

    function erase() {
        display.textContent = display.textContent.slice(0, -1);
    }

    function changeToPosNeg() {
        const minus = "-";
        if (display.textContent.charAt(0) === "-") {
            display.textContent = display.textContent.substring(1);
        }
        else if (display.textContent === "") {
            return;
        } else {
            display.textContent = minus + display.textContent;
        }
    }

    function addDecimalPoint() {
        const decimalPoint = ".";
        if (display.textContent === "" || display.textContent.indexOf('.') >= 1) {
            return;
        } else {
            display.textContent += decimalPoint;
        }
    }

    function addSquare() {
        if (display.textContent !== "") {
            display.textContent = Math.pow(display.textContent, 2);
        }
        if (!Number.isInteger(Number(display.textContent))) {
            display.textContent = Number(display.textContent).toFixed(2);
        }
    }

    function storeUserInput() {
        const addButton = document.querySelector('[value="+"]');
        const addValue = addButton.getAttribute("value");
        const subButton = document.querySelector('[value="-"]');
        const multiplyButton = document.querySelector('[value="*"]');
        const divideButton = document.querySelector('[value="/"]');
        const resultButton = document.querySelector('[value="="]');

        let resultStorage = [
            {
                n1: 0,
                n2: 0,
                operator: 0,
                storedResult: 0
            }
        ];

        let addOperation = addButton.addEventListener('click', () => {
            resultStorage[0].n1 = display.textContent;
            console.log(resultStorage, "resultStorage");
            if (display.textContent !== "") {
                display.textContent += addValue;
            }
        });

        resultButton.addEventListener('click', () => {
            operate()
        });
    }

    inputsEventListener();
    storeUserInput()
}
init();