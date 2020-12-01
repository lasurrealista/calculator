const display = document.querySelector('.result');

const numberButtons = document.querySelectorAll('.btn__numbers, .btn__decimal-point');
const calculateButton = document.querySelector('.btn__equals-sign');
const clearButton = document.querySelector('.btn__clear');
const operatorButtons = document.querySelectorAll('.btn__operations');    

for (let i = 0; i < numberButtons.length; i += 1) {
    numberButtons[i].addEventListener('click', function displayNums() {
        display.value += numberButtons[i].textContent;
    });
}

for (let i = 0; i < operatorButtons.length; i += 1) {
    operatorButtons[i].addEventListener('click', function displayNums() {
        display.value += ' '+operatorButtons[i].textContent+' '; 
    });
}    

calculateButton.addEventListener('click', getRowToCalculate);

function getRowToCalculate() {
    const currentDisplay = display.value;
    const splittedArray = currentDisplay.split(' ');
    const finalResult = getNumbersSigns(splittedArray);
    display.value += ' = ' + finalResult;
};

function getNumbersSigns(array) {
    let numbers = [];
    let signs = []; 
    for (let i = 0; i < array.length; i +=1) {
        if (i % 2 === 0) {
            numbers.push(parseFloat(array[i]));
        } else {
            signs.push(array[i]);
        }
    }

    const calculations = {
        '+': function(a, b) {return a + b},
        '-' :function(a, b) {return a - b},
        '*': function(a, b) {return a * b},
        '/': function(a, b) {return a / b},
    }

    let result = '';
    result = numbers[0];
    for (let i = 0; i < signs.length; i++) {
        result = calculations[signs[i]](result, numbers[i + 1]);
    }
    return result;
};

clearButton.addEventListener('click', function clearDisplay() {    
    display.value = '';   
});
