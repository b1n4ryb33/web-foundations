// CONSTANTS ------------------------------
const MATH_OPERATORS = [
    {'symbol': '/', 'keyCode': 111},
    {'symbol': '*', 'keyCode': 106},
    {'symbol': '-', 'keyCode': 109},
    {'symbol': '+', 'keyCode': 107}];

const INPUT_OPERATORS = [
    {'operator': 'backspace', 'keyCode': 8},
    {'operator': 'enter', 'keyCode': 13},
    {'operator': 'delete', 'keyCode': 46},
    {'operator': 'c', 'keyCode': 67},
    {'operator': 'decimal_point', 'keyCode': 110}];

const NUMBERS = [
    {'value': 0, 'keyCodes': [48, 96]},
    {'value': 1, 'keyCodes': [49, 97]},
    {'value': 2, 'keyCodes': [50, 98]},
    {'value': 3, 'keyCodes': [51, 99]},
    {'value': 4, 'keyCodes': [52, 100]},
    {'value': 5, 'keyCodes': [53, 101]},
    {'value': 6, 'keyCodes': [54, 102]},
    {'value': 7, 'keyCodes': [55, 103]},
    {'value': 8, 'keyCodes': [56, 104]},
    {'value': 9, 'keyCodes': [57, 105]},];

const ALLOWED_KEY_CODES = MATH_OPERATORS
                            .map(operator => operator.keyCode)
                            .concat(INPUT_OPERATORS
                                        .map(operator => operator.keyCode),
                                    NUMBERS
                                        .reduce((keyCodes, number) => {
                                            return keyCodes.concat(number.keyCodes);
                                    },[]));


// BUSINESS LOGIC -------------------------
function add (a, b) {
    return a + b;
}

function substract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    
    if(b === 0)
    
       throw new Error('Cannot divide by null.');

    
    return a / b;

}

function operate(operator, a, b){
    switch(operator.symbol){
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}


// PROCESS LOGIC --------------------------
function processInput(keyCode){
    
    const isAllowedKeyCode = ALLOWED_KEY_CODES.some(allowedCode => allowedCode === keyCode);
    
    if(!isAllowedKeyCode)
        return;
    
    const expressionIsEmpty = expression === '';
    const lastIsOperator = MATH_OPERATORS.some(operator => operator.symbol === expression.slice(-1));
    const inputIsClear = keyCode === 46 || keyCode == 67;
    const inputIsBackspace = keyCode === 8;
    const inputIsEqualSign = keyCode === 13;
        
    const inputNumber = NUMBERS
                            .find(number => number.keyCodes
                                .find(numberKeyCode => numberKeyCode === keyCode));

    const inputMathOperator = MATH_OPERATORS
                                .find(operator => operator.keyCode === keyCode);

    if(expressionIsEmpty && (inputMathOperator || inputIsEqualSign))
        return;

    if(lastIsOperator && (inputMathOperator || inputIsEqualSign))
        return;

    if (!expressionIsEmpty && inputIsClear)
        clear();

    if (!expressionIsEmpty && inputIsBackspace)
    {
        expression = expression.slice(0, -1);
        populateDisplay(expression);
    }

    if (inputNumber){
        expression += inputNumber.value;
        populateDisplay(expression);
    }
    
    const isOperateable = currentOperator != null && (inputMathOperator || inputIsEqualSign);

    if(inputMathOperator && !isOperateable){
        firstNumber = expression;
        currentOperator = inputMathOperator;
        expression += currentOperator.symbol;
        populateDisplay(expression); 
    }

    if(inputMathOperator && isOperateable){
        const secondNumber = expression.replace(firstNumber, '').replace(currentOperator.symbol, '');   
        const result = operate(currentOperator, Number(firstNumber), Number(secondNumber));
        firstNumber = result;
        currentOperator = inputMathOperator;
        expression = result + currentOperator.symbol;
        populateDisplay(expression);
    }

    if(isOperateable){
        const secondNumber = expression.replace(firstNumber, '').replace(currentOperator.symbol, '');   
        const result = operate(currentOperator, Number(firstNumber), Number(secondNumber));
        firstNumber = result;
        currentOperator = null;
        expression = result.toString();
        populateDisplay(expression);
    }
}

function clear(){
    clearDisplay();
    currentOperator = null;
    expression = '';
}

// INIT FUNCTIONS -------------------------
function initCalculator(){
    initNumberBlock();
    initMathOperatorBlock();
    initEventHandlers();
}   

function initNumberBlock(){
    
    const numberBlock = document.querySelector('#number-block');

    numbersAppendTo(numberBlock);
    inputOperatorsAppendTo(numberBlock);

}

function initMathOperatorBlock(){

    let operatorBlock = document.querySelector('#operators');

    MATH_OPERATORS.forEach(operator => {
        let operatorEl = document.createElement('div');
        operatorEl.classList.add('math-operator');
        operatorEl.innerHTML = `<kbd data-key='${operator.keyCode}'>${operator.symbol}</kbd>`;
        operatorEl.addEventListener('transitionend', removeTransition);
        operatorBlock.appendChild(operatorEl);
    });
}

function initEventHandlers(){

    window.addEventListener('keydown', keyPressed);

    const calculatorButtons = document.querySelectorAll('div.number, div.math-operator, div.input-operator');
    calculatorButtons.forEach(calculatorButton =>
             calculatorButton.addEventListener('click', keyClicked));
}

function numbersAppendTo(numberBlock){
    NUMBERS
    .sort((firstNumber, secondNumber) => firstNumber.value < secondNumber.value ? 1 : -1)
    .forEach(number => {
        const numberNode = document.createElement('div');
        numberNode.classList.add('number');
        numberNode.innerHTML = `<kbd data-key='${number.keyCodes.join(' ')}'>${number.value}</kbd>`;
        numberNode.addEventListener('transitionend', removeTransition);
        numberBlock.appendChild(numberNode);
    })
}

function inputOperatorsAppendTo(numberBlock){

    const clearButton = document.createElement('div');
    const equalsButton = document.createElement('div');
    clearButton.classList.add('input-operator');
    equalsButton.classList.add('input-operator');

    const clearOperatorKeyCodes = INPUT_OPERATORS
                            .filter(operator => operator.operator === 'delete' || operator.operator === 'c')
                            .map(operator => operator.keyCode)
                            .join(' ');

    const enterOperatorKeyCodes = INPUT_OPERATORS
                            .filter(operator => operator.operator === 'enter' || operator.operator === '=')
                            .map(operator => operator.keyCode)
                            .join(' ');

    clearButton.innerHTML = `<kbd data-key='${clearOperatorKeyCodes}'>c</kbd>`;
    equalsButton.innerHTML = `<kbd data-key='${enterOperatorKeyCodes}'>=</kbd>`;

    clearButton.addEventListener('transitionend', removeTransition);
    equalsButton.addEventListener('transitionend', removeTransition);
    
    numberBlock.appendChild(clearButton);
    numberBlock.appendChild(equalsButton);
}


// DISPLAY FUNCTIONS -----------------------
function populateDisplay(value){
    const expressionNode = document.querySelector('#expression');
    expressionNode.innerHTML = value;
}

function clearDisplay(){
    populateDisplay('');
}

// EVENT HANDLER ---------------------------
function keyPressed(event) {

    const key = Array.from(document.querySelectorAll('kbd'))
                                .find(kbd => 
                                    kbd.dataset.key.split(' ')
                                    .find(keyCode => Number(keyCode) === event.keyCode));
    
    if(key)
        key.parentNode.classList.add('key-pressed');

    processInput(event.keyCode);
    
}

function keyClicked(event) {
    processInput(getKeyCodeFromEvent(event));
}

function removeTransition(event) {

    if (event.propertyName !== 'transform') return;

    event.target.classList.remove('key-pressed');
}


// HELPER ----------------------------------
function getKeyCodeFromEvent(event){
    
    const targetNode = event.target;

    // .split(' ')[0] -> if there are two keyCodes return only the first
    // as it is not important for clicks

    // If the event gets triggered on the KDB element
    if (targetNode.tagName === 'KBD')
        return Number(targetNode.dataset.key.split(' ')[0]);
    
    return Number(targetNode.firstChild.dataset.key.split(' ')[0]);
}


// GLOBAL VARIABLES ------------------------
let firstNumber;
let expression = '';
let currentOperator;

// EXECUTION -------------------------------
initCalculator();


// TODOS
// 4. simplify logic // wrap logic with objects
// 5. Add decimals
// 6. Responsiveness
// 7. Add History