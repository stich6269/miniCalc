var amountDigitalButton = 10;
var columnsButtonCalc = 4;
var rowsButtonCalc = 5;
var firstMathNumber = 0;
var secondMathNumber = 0;
var dispData ='';
var mathOperation='';
var topDispData='';
var Answer='';
var flagToUpdateDisplay='';

var HTMLiconButtonCalc = ['+/-', 7, 4, 1, 0, 'Ans', 8, 5, 2, '.', '&larr;', 9, 6, 3, '=', 'CE', '&divide;', '&times;', '-','+'];
var funcButtonCalc = ['+/-', 7, 4, 1, 0, 'Ans', 8, 5, 2, '.', 'C', 9, 6, 3, '=', 'CE', 'share', 'multiple', 'rob','add'];

var mathOperationObj = new Object();
mathOperationObj.share = function() {Answer = firstMathNumber/secondMathNumber };
mathOperationObj.multiple = function() {Answer = firstMathNumber*secondMathNumber };
mathOperationObj.rob = function() {Answer = firstMathNumber-secondMathNumber };
mathOperationObj.add = function() {Answer = firstMathNumber+secondMathNumber };

var calcButton={
    '+/-': function() {
        if (dispData) dispData = parseFloat(dispData*-1);
        updDisplay();
    },
    Ans: function(){
        updDispAfterRecNumber();
        (topDispData)?dispData = topDispData:topDispData = 0;
        updDisplay();
    },
    '.': function() {
        updDispAfterRecNumber();
        ()dispData += '.';
        updDisplay();
    },
    'C': function(){
        dispData = dispData.toString();
        dispData = dispData.slice(0,-1);
        updDisplay();
    },
    '=': function(){
        if (firstMathNumber && parseFloat(dispData) && mathOperation){
            secondMathNumber = parseFloat(dispData);
            mathOperationObj[mathOperation]();
            topDispData = Answer;
            updTopDisplay(topDispData);
            clrCalcVariable();
            dispData = topDispData;
            updDisplay();
            flagToUpdateDisplay = true;
        }
    },
    CE: function(){
        clrCalcVariable();
        updDisplay();
    }
};

//-------------------------------------------------------------------------------//
window.onload = function() {
    createCalc();
    subsEventButton();
};

for (var i = 0; i<amountDigitalButton; i++) {
    (function (i) {
        calcButton[i] = function() {
            updDispAfterRecNumber();
            if (Answer){
                topDispData = Answer;
                clrCalcVariable();
                updTopDisplay(topDispData);
            }
            dispData = dispData.toString() + i;
            updDisplay();
        }
    })(i)
}

for (var i = funcButtonCalc.length-4; i<funcButtonCalc.length; i++) {
    (function (i) {
        calcButton[funcButtonCalc[i]] = function() {
            recordMathOperand();
            mathOperation=funcButtonCalc[i];
            console.log(mathOperation);
        }
    })(i)
}

function createCalc(){
    var divContainer = document.getElementById('calc');
    var inputAnsver = document.createElement('INPUT');
    inputAnsver.type = 'text';
    inputAnsver.id = 'answer';
    inputAnsver.disabled = true;
    divContainer.appendChild(inputAnsver);
    var inputDisplay = document.createElement('INPUT');
    inputDisplay.type = 'text';
    inputDisplay.id = 'display';
    inputDisplay.disabled = true;
    divContainer.appendChild(inputDisplay);
    for (var i = 0; i < columnsButtonCalc; i++) {
        var ulElement = document.createElement('UL');
        divContainer.appendChild(ulElement);
        for (var j = 0; j < rowsButtonCalc; j++) {
            var liElement = document.createElement('LI');
            liElement.innerHTML = HTMLiconButtonCalc[j+i*5];
            liElement.id = funcButtonCalc[j +i*5];
            ulElement.appendChild(liElement);
        }
    }
}
function subsEventButton(){
    var calcButtonArr = document.getElementsByTagName('LI');
    for (var i = 0; i < calcButtonArr.length; i++) {
        calcButtonArr[i].onclick = function(){
            calcButton[this.id]();
        }
    }
    var calcButtonCE = document.getElementById('CE');
    calcButtonCE.ondblclick = function(){
        topDispData = '';
        updTopDisplay(topDispData);
    }
}
function updDisplay(){
    var dispInputEment = document.getElementById('display');
    (dispData)?dispInputEment.value = dispData.toString().substring(0,15):dispInputEment.value = '0';
}

function updTopDisplay(anwver){
    var topDisplay = document.getElementById('answer');
    topDisplay.value = anwver;
}

function recordMathOperand(){
    (parseFloat(dispData))?firstMathNumber = parseFloat(dispData):firstMathNumber = 0;
    flagToUpdateDisplay = true;
}

function clrCalcVariable(){
    Answer = '';
    dispData = '';
    mathOperation = '';
    firstMathNumber = '';
    secondMathNumber = '';
}

function updDispAfterRecNumber() {
    if (flagToUpdateDisplay == true) {
        dispData = '';
        flagToUpdateDisplay = false;
    }
}