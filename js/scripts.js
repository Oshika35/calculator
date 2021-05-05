function init() {
    const display = document.querySelector(".display__text");

    function add(x, y) {
        return x + y;
    }

    function substract(x, y) {
        return x - y;
    }

    function multiply(x, y) {
        return x * y;
    }

    function divide(x, y) {
        return x / y;
    }

    function operate(x, operator, y) {
        if (operator === "+") {
            return add(x, y);
        }
        else if (operator === "-") {
            return substract(x, y);
        }
        else if (operator === "*") {
            return multiply(x, y);
        }
        else if (operator === "/") {
            return divide(x, y);
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

    function evaluate(result, operator) {
        let operand1 = Number(result.substring(0, result.lastIndexOf(operator)));
        let operand2 = Number(result.substring(result.lastIndexOf(operator) + 1));
        display.textContent = operate(operand1, operator, operand2);
    }

    function storeUserInput() {
        const addButton = document.querySelector('[value="+"]');
        const addValue = addButton.getAttribute("value");
        const subButton = document.querySelector('[value="-"]');
        const subValue = subButton.getAttribute("value");
        const multiplyButton = document.querySelector('[value="*"]');
        const multiplyValue = multiplyButton.getAttribute("value");
        const divideButton = document.querySelector('[value="/"]');
        const divideValue = divideButton.getAttribute("value");
        const resultButton = document.querySelector('[value="="]');
        const operators = ["+", "-", "*", "/"];

        addButton.addEventListener('click', () => {
            let storedOperator = addValue;
            if (operators.some(operator => display.textContent.includes(operator))) {
                const addOperator = addValue;
                evaluate(display.textContent, addOperator);
            }
            if (display.textContent !== "") {
                display.textContent += addValue;
            }
        });

        subButton.addEventListener('click', () => {
            if (operators.some(operator => display.textContent.includes(operator))) {
                const subOperator = subValue;
                evaluate(display.textContent, subOperator);
            }
            if (display.textContent !== "") {
                display.textContent += subValue;
            }
        });

        multiplyButton.addEventListener('click', () => {
            if (operators.some(operator => display.textContent.includes(operator))) {
                const multiplyOperator = multiplyValue;
                evaluate(display.textContent, multiplyOperator);
            }
            if (display.textContent !== "") {
                display.textContent += multiplyValue;
            }
        });

        divideButton.addEventListener('click', () => {
            if (operators.some(operator => display.textContent.includes(operator))) {
                const divideOperator = divideValue;
                evaluate(display.textContent, divideOperator);
            }
            if (display.textContent !== "") {
                display.textContent += divideValue;
            }
        });

        resultButton.addEventListener('click', () => {
            const n1 = Number(display.textContent.substring(0, display.textContent.lastIndexOf(storedOperator)));
            const n2 = Number(display.textContent.substring(display.textContent.lastIndexOf(storedOperator) + 1));
            display.textContent = operate(n1, storedOperator, n2)
        });
    }

    inputsEventListener();
    storeUserInput()
}
init();