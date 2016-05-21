/*jshint esversion: 6 */
/*jshint -W097 */

'use strict';

const test = require('tape');
const expression = require('../expression');

test('Addition expression', (t) => {
    let expected = 4;
    t.equal(expression.resolveInfix('2 + 2'), expected, '2 + 2 = 4');
    t.equal(expression.resolveInfix('2+2'), expected, '2+2 = 4');
    t.end();
});

test('Subtraction expression', (t) => {
    let expected = 2;
    t.equal(expression.resolveInfix('5 - 3'), expected, '5 - 3 = 2');
    t.equal(expression.resolveInfix('5-3'), expected, '5-3 = 2');
    t.end();
});

test('Multiplication expression', (t) => {
    let expected = 16;
    t.equal(expression.resolveInfix('8 * 2'), expected, '8 * 2 = 16');
    t.equal(expression.resolveInfix('8*2'), expected, '8-2 = 16');
    t.end();
});

test('Division expression', (t) => {
    let expected = 20;
    t.equal(expression.resolveInfix('100 / 5'), expected, '100 / 5 = 20');
    t.equal(expression.resolveInfix('100/5'), expected, '100/5 = 20');
    t.equal(expression.resolveInfix('100/0'), undefined, '100/0 = undefined');
    t.end();
});

test('Invalid expression', (t) => {
    t.equal(expression.resolveInfix('100 # 5'), undefined, '100 # 5 = undefined');
    t.equal(expression.resolveInfix('p+l'), undefined, 'p+l = undefined');
    t.end();
});

test('Expression with parenthesis', (t) => {
    let expected = 4;
    t.equal(expression.resolveInfix('(2 + 2)'), expected, '2 + 2 = 4');
    t.equal(expression.resolveInfix('2+2'), expected, '2+2 = 4');
    t.end();
});

test('Expression with two or more operations', (t) => {
    t.equal(expression.resolveInfix('5 + 12 / 3'), 9, '5 + 12 / 3 = 9');
    t.equal(expression.resolveInfix('20 - 2 * 4'), 12, '20 - 2 * 4 = 12');
    t.equal(expression.resolveInfix('20 - 2 * 4 + 12 / 4'), 15, '20 - 2 * 4 + 12 / 4 = 15');
    t.end();
});

test('Expression with two or more operations and parenthesis', (t) => {
    t.equal(expression.resolveInfix('(10 + 18) / 7'), 4, '(10 + 18) / 7 = 4');
    t.equal(expression.resolveInfix('((10 + 18) / 7) + 3'), 7, '((10 + 18) / 7) + 3 = 7');
    t.equal(expression.resolveInfix('(3 + 7) - (5 - 1)'), 6, '(3 + 7) - (5 - 1) = 6');
    t.equal(expression.resolveInfix('((10 + 18) / 7) - (5 - 1)'), 0, '((10 + 18) / 7) - (5 - 1) = 0');
    t.equal(expression.resolveInfix('((100 / 4) / 5) - (2 * 1)'), 3, '((100 / 4) / 5) - (2 * 1) = 3');
    t.equal(expression.resolveInfix('(1+4*(15-9))'), 25, '(1+4*(15-9)) = 25');
    t.equal(expression.resolveInfix('((1+4*(15-9))*(7-5)+2)/13'), 4, '((1+4*(15-9))*(7-5)+2)/13 = 4');
    t.equal(expression.resolveInfix('(u*7+2)/13'), undefined, '(u*7+2)/13 = undefined');
    t.end();
});


