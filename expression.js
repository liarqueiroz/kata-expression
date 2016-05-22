/*jshint esversion: 6 */
/*jshint -W097 */
'use strict';

//[(]*[0-9]+\s*[+-/*]\s*[0-9]+[)]*

function resolveInfix(expression) {
    if (!isNaN(+expression)) {
        return +expression;
    }
    
    let arraySubExpression = expression.match(/[(][0-9]+(\s*[+-/*]\s*[0-9]+)+[)]/g) || expression.match(/[[0-9]+\s*[/*]\s*[0-9]+/g) || expression.match(/[0-9]+\s*[+-]\s*[0-9]+/g),
        subExpression,
        subExpressionResult;
        
   if (arraySubExpression && arraySubExpression.length > 0) {
        subExpression = arraySubExpression[0];
        
        if (subExpression.match(/^[(]*[0-9]+\s*[+-/*]\s*[0-9]+[)]*$/g)){
            subExpressionResult = resolveSimpleInfix(subExpression.replace(/[()]/gi, ''));
        }
        else {
            subExpressionResult = resolveInfix(subExpression.match(/[0-9]+(\s*[+-/*]\s*[0-9]+)+/g)[0]);
        }
        return resolveInfix(expression.replace(subExpression, subExpressionResult));
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