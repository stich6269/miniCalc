/**
 * Created by Артем on 09.01.2015.
 */
var myButton = new Array;
var myInput = new Array;
var strDisplay = "", strCode='', strAns = 0, flagIs;

var valueDisplayArr = {
    abs: 'abs(',
    '√': '√(',
    'x<sup>2</sup>': 'pow(',
    Sin: 'sin(',
    Cos: 'cos(',
    Tan: 'tan(',
    '←': '←',
    AC:'AC',
    '=':'='
};

var valueCodeArr = {
    abs: 'Math.abs(',
    '√': 'Math.sqrt(',
    Ans: 'strAns',
    'x<sup>y</sup>': 'pow(',
    Sin: 'Math.sin(',
    Cos: 'Math.cos(',
    Tan: 'Math.tan(',
    '←': '',
    '×': '*',
    '÷': '/'
};

window.onload = function() {
    myButton = document.getElementsByTagName('li');
    myInput = document.getElementsByTagName('input');
        for (var i = 0; i < myButton.length; i++) {
            myButton[i].onclick = checkEvent;
        }
};

function checkEvent() {
    var mySymbol = checkSymbol(this.innerHTML);
    var myCode = checkCode(this.innerHTML);
    checkControlButton(mySymbol);
        if ((strDisplay.length < 22) & !(valueDisplayArr[mySymbol])) {
            strDisplay = strDisplay + mySymbol;
            strCode = strCode + myCode;
            myInput[1].value = strDisplay;
        }
    console.log(strCode);
}

function checkControlButton(mySymbol){
    if (flagIs){
        flagIs=false;
        clrStr();
    }
    switch (mySymbol){
       case 'AC':
           clrStr();
           displayResult();
           return;
       case '←':
           strDisplay = strDisplay.slice(0, -1);
           strCode = strCode.slice(0, -1);
           displayResult();
           return;
       case '=':
           strAns = eval(strCode);
           displayResult(strCode+'='+strAns);
           clrStr();
           strCode = (strCode + strAns)|| 'Error';
           strDisplay = strCode;
                if (strDisplay=='Error' || strDisplay=='undefined'){
                   strAns = '';
                    clrStr();
                }
           flagIs = true;
           displayResult();
           return;
    }
}

function clrStr(){
    strDisplay = '';
    strCode = '';
}

function displayResult(value){
    myInput[1].value = strDisplay;
    (value) ? myInput[0].value = value : 0;
}

function checkSymbol(mySymbol){
    return valueDisplayArr[mySymbol] || mySymbol;
}

function checkCode(myCode){
    return valueCodeArr[myCode] || myCode;
}
