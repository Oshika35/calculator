function init() {
    const calculator = document.querySelector('.calculator');
    const display = calculator.querySelector(".display__text");
    const operators = ["+", "-", "*", "/"];
    let storedOperator = 0;

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
        if (y === 0) {
            return display.textContent = "You can't divide by 0";
        }
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
        const digits = calculator.querySelectorAll(".digit");
        const eraseButton = calculator.querySelector('[value="Erase"]');
        const resetButton = calculator.querySelector(".account-current");
        const posNegButton = calculator.querySelector('[value="+/-"]');
        const decimalPointButton = calculator.querySelector('[value="."]');
        const squareButton = calculator.querySelector('[value="x²"]');

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
        storedOperator = 0;
        const disableButtons = calculator.querySelectorAll(".row__buttons");
        disableButtons.forEach((button) => button.disabled = false);
    }

    function erase() {
        display.textContent = display.textContent.slice(0, -1);
    }

    function nthIndex(str, pat, n) {
        var L = str.length, i = -1;
        while (n-- && i++ < L) {
            i = str.indexOf(pat, i);
            if (i < 0) break;
        }
        return i;
    }

    function changeToPosNeg() {
        const minus = "-";
        const count = [...display.textContent].filter(operation => operators.includes(operation)).length;
        const secondOperatorPosition = nthIndex(display.textContent, operators, 2);
        if (display.textContent.charAt(0) === minus && count === 2 && !operators.some(operator => display.textContent.charAt(display.textContent.length - 1).includes(operator))) {
            display.textContent = [display.textContent.slice(0, secondOperatorPosition), minus, display.textContent.slice(secondOperatorPosition)].join('')
        }
        else if (display.textContent.charAt(0) === minus) {
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
        if (operators.some(operator => display.textContent.charAt(display.textContent.length - 1).includes(operator))) {
            return;
        }
        if (display.textContent !== "") {
            display.textContent = Math.pow(display.textContent, 2);
        }
        if (!Number.isInteger(Number(display.textContent))) {
            display.textContent = Number(display.textContent).toFixed(2);
        }
    }

    function evaluate(calculation, operator) {
        const count = [...calculation].filter(operation => operators.includes(operation)).length;
        if (count === 1 && display.textContent.charAt(0) === "-") {
            return;
        } else {
            let operand1 = Number(calculation.substring(0, calculation.lastIndexOf(operator)));
            let operand2 = Number(calculation.substring(calculation.lastIndexOf(operator) + 1));
            display.textContent = operate(operand1, operator, operand2);
            roundResult(display.textContent);
        }
    }

    function roundResult(result) {
        result = Math.round((Number(result) + Number.EPSILON) * 1000000) / 1000000;
        display.textContent = result;
    }

    function storeUserInput() {
        const addButton = calculator.querySelector('[value="+"]');
        const addValue = addButton.getAttribute("value");
        const subButton = calculator.querySelector('[value="-"]');
        const subValue = subButton.getAttribute("value");
        const multiplyButton = calculator.querySelector('[value="*"]');
        const multiplyValue = multiplyButton.getAttribute("value");
        const divideButton = calculator.querySelector('[value="/"]');
        const divideValue = divideButton.getAttribute("value");
        const resultButton = calculator.querySelector('[value="="]');

        addButton.addEventListener('click', () => {
            if (operators.some(operator => display.textContent.charAt(display.textContent.length - 1).includes(operator))) {
                return;
            }
            if (operators.some(operator => display.textContent.includes(operator))) {
                evaluate(display.textContent, storedOperator);
            }
            if (display.textContent !== "") {
                display.textContent += addValue;
            }
            storedOperator = addValue;
        });

        subButton.addEventListener('click', () => {
            if (operators.some(operator => display.textContent.charAt(display.textContent.length - 1).includes(operator))) {
                return;
            }
            if (operators.some(operator => display.textContent.includes(operator))) {
                evaluate(display.textContent, storedOperator);
            }
            if (display.textContent !== "") {
                display.textContent += subValue;
            }
            storedOperator = subValue;
        });

        multiplyButton.addEventListener('click', () => {
            if (operators.some(operator => display.textContent.charAt(display.textContent.length - 1).includes(operator))) {
                return;
            }
            if (operators.some(operator => display.textContent.includes(operator))) {
                evaluate(display.textContent, storedOperator);
            }
            if (display.textContent !== "") {
                display.textContent += multiplyValue;
            }
            storedOperator = multiplyValue;
        });

        divideButton.addEventListener('click', () => {
            if (operators.some(operator => display.textContent.charAt(display.textContent.length - 1).includes(operator))) {
                return;
            }
            if (operators.some(operator => display.textContent.includes(operator))) {
                evaluate(display.textContent, storedOperator);
            }
            if (display.textContent !== "") {
                display.textContent += divideValue;
            }
            storedOperator = divideValue;
        });

        resultButton.addEventListener('click', () => {
            if (operators.some(operator => display.textContent.includes(operator))) {
                let n1 = Number(display.textContent.substring(0, display.textContent.lastIndexOf(storedOperator)));
                let n2 = Number(display.textContent.substring(display.textContent.lastIndexOf(storedOperator) + 1));
                let result = operate(n1, storedOperator, n2);
                roundResult(result);

                const disableButtons = calculator.querySelectorAll(".row__buttons");
                disableButtons.forEach((button) => button.disabled = true);
                calculator.querySelector(".account-current").disabled = false;
            }
        });
    }

    inputsEventListener();
    storeUserInput();
}
init();