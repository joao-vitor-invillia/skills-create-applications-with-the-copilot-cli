const { spawnSync } = require('child_process');
const path = require('path');
const { addition, subtraction, multiplication, division, modulo, power, squareRoot } = require('../calculator');

const CLI = path.join(__dirname, '..', 'calculator.js');
const run = (...args) => spawnSync('node', [CLI, ...args], { encoding: 'utf8' });

describe('addition', () => {
  test('2 + 3 = 5', () => expect(addition(2, 3)).toBe(5));
  test('negative numbers', () => expect(addition(-2, -3)).toBe(-5));
  test('mixed signs', () => expect(addition(-2, 3)).toBe(1));
  test('with zero', () => expect(addition(7, 0)).toBe(7));
  test('decimals', () => expect(addition(0.1, 0.2)).toBeCloseTo(0.3));
});

describe('subtraction', () => {
  test('10 - 4 = 6', () => expect(subtraction(10, 4)).toBe(6));
  test('result negative', () => expect(subtraction(4, 10)).toBe(-6));
  test('negative operand', () => expect(subtraction(5, -3)).toBe(8));
  test('with zero', () => expect(subtraction(7, 0)).toBe(7));
  test('decimals', () => expect(subtraction(0.5, 0.2)).toBeCloseTo(0.3));
});

describe('multiplication', () => {
  test('45 * 2 = 90', () => expect(multiplication(45, 2)).toBe(90));
  test('by zero', () => expect(multiplication(5, 0)).toBe(0));
  test('negative numbers', () => expect(multiplication(-4, -3)).toBe(12));
  test('mixed signs', () => expect(multiplication(-4, 3)).toBe(-12));
  test('decimals', () => expect(multiplication(1.5, 2)).toBe(3));
});

describe('division', () => {
  test('20 / 5 = 4', () => expect(division(20, 5)).toBe(4));
  test('non-integer result', () => expect(division(1, 4)).toBe(0.25));
  test('negative numbers', () => expect(division(-20, -5)).toBe(4));
  test('mixed signs', () => expect(division(20, -5)).toBe(-4));
  test('zero numerator', () => expect(division(0, 5)).toBe(0));
  test('division by zero throws', () => {
    expect(() => division(1, 0)).toThrow('Divisão por zero');
  });
  test('zero divided by zero throws', () => {
    expect(() => division(0, 0)).toThrow('Divisão por zero');
  });
});

describe('modulo', () => {
  test('5 % 2 = 1', () => expect(modulo(5, 2)).toBe(1));
  test('exact division', () => expect(modulo(10, 5)).toBe(0));
  test('dividend smaller than divisor', () => expect(modulo(2, 5)).toBe(2));
  test('negative dividend keeps sign', () => expect(modulo(-5, 3)).toBe(-2));
  test('negative divisor', () => expect(modulo(5, -3)).toBe(2));
  test('decimals', () => expect(modulo(5.5, 2)).toBeCloseTo(1.5));
  test('zero dividend', () => expect(modulo(0, 5)).toBe(0));
  test('modulo by zero throws', () => {
    expect(() => modulo(5, 0)).toThrow('Módulo por zero');
  });
});

describe('power', () => {
  test('2 ^ 3 = 8', () => expect(power(2, 3)).toBe(8));
  test('exponent zero', () => expect(power(5, 0)).toBe(1));
  test('exponent one', () => expect(power(7, 1)).toBe(7));
  test('zero base', () => expect(power(0, 3)).toBe(0));
  test('0 ^ 0 = 1', () => expect(power(0, 0)).toBe(1));
  test('negative exponent', () => expect(power(2, -2)).toBe(0.25));
  test('negative base, odd exponent', () => expect(power(-2, 3)).toBe(-8));
  test('negative base, even exponent', () => expect(power(-2, 2)).toBe(4));
  test('fractional exponent', () => expect(power(9, 0.5)).toBe(3));
});

describe('squareRoot', () => {
  test('√16 = 4', () => expect(squareRoot(16)).toBe(4));
  test('√0 = 0', () => expect(squareRoot(0)).toBe(0));
  test('√1 = 1', () => expect(squareRoot(1)).toBe(1));
  test('non-perfect square', () => expect(squareRoot(2)).toBeCloseTo(1.41421356));
  test('decimal input', () => expect(squareRoot(0.25)).toBe(0.5));
  test('negative number throws', () => {
    expect(() => squareRoot(-1)).toThrow('raiz quadrada de um número negativo');
  });
  test('large negative number throws', () => {
    expect(() => squareRoot(-1e10)).toThrow('número negativo');
  });
});

describe('CLI', () => {
  test.each([
    [['add', '2', '3'], '5'],
    [['+', '2', '3'], '5'],
    [['sub', '10', '4'], '6'],
    [['-', '10', '4'], '6'],
    [['mul', '45', '2'], '90'],
    [['*', '45', '2'], '90'],
    [['x', '45', '2'], '90'],
    [['div', '20', '5'], '4'],
    [['/', '20', '5'], '4'],
  ])('%j prints %s', (args, expected) => {
    const r = run(...args);
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe(expected);
  });

  test('division by zero shows error and exits 1', () => {
    const r = run('div', '1', '0');
    expect(r.status).toBe(1);
    expect(r.stderr).toContain('Divisão por zero');
  });

  test.each([
    [['pow', '2', '3']],
    [['add', '2']],
    [['add', 'a', '3']],
    [[]],
  ])('invalid input %j shows usage and exits 1', (args) => {
    const r = run(...args);
    expect(r.status).toBe(1);
    expect(r.stderr).toContain('Uso:');
  });
});
