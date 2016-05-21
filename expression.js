/*jshint esversion: 6 */
/*jshint -W097 */
'use strict';

//[(]*[0-9]+\s*[+-/*]\s*[0-9]+[)]*

function resolveInfix(expression) {
    console.log(expression);
    if (!isNaN(+expression)) {
        return +expression;
    }
    
    let arraySimpleExpression = expression.match(/[(][0-9]+\s*[+-/*]\s*[0-9]+[)]/g) || expression.match(/[[0-9]+\s*[/*]\s*[0-9]+/g) || expression.match(/[0-9]+\s*[+-]\s*[0-9]+/g),
        simpleExpression,
        simpleExpressionResult;
        
   if (arraySimpleExpression && arraySimpleExpression.length > 0) {
        simpleExpression = arraySimpleExpression[0];
        simpleExpressionResult = resolveSimpleInfix(simpleExpression.replace(/[()]/gi, ''));
        return resolveInfix(expression.replace(simpleExpression, simpleExpressionResult));
    }
}

function resolveSimpleInfix(expression) {
    let arrayOperation = expression.match(/[+-/*]/g),
        operation = arrayOperation && arrayOperation[0] || undefined,
        arrayExp = expression.replace(/ /gi, '').split(operation),
        operator1,
        operator2;
        
        operator1 = +arrayExp[0],
        operator2 = +arrayExp[1];
        
        if (isNaN(operator1) || isNaN(operator2)) {
            return undefined;
        }
        
    switch (operation) {
        case '+' :
            return operator1 + operator2;
        case '-':
            return operator1 - operator2;
        case '*':
            return operator1 * operator2;
        case '/':
            return operator2 !== 0 ? operator1 / operator2 : undefined;
    }
}


module.exports = {
    resolveInfix
};