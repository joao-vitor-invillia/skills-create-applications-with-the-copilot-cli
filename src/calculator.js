#!/usr/bin/env node
/**
 * Calculadora CLI
 *
 * Operações suportadas:
 *   - add / +  : adição
 *   - sub / -  : subtração
 *   - mul / x / * : multiplicação (use aspas com * no shell: '*')
 *   - div / /  : divisão (divisão por zero retorna erro)
 *
 * Uso: node src/calculator.js <operação> <número1> <número2>
 * Ex.: node src/calculator.js add 2 3
 */

// Adição
function add(a, b) {
  return a + b;
}

// Subtração
function subtract(a, b) {
  return a - b;
}

// Multiplicação
function multiply(a, b) {
  return a * b;
}

// Divisão
function divide(a, b) {
  if (b === 0) {
    throw new Error('Divisão por zero não é permitida.');
  }
  return a / b;
}

const operations = {
  add, '+': add,
  sub: subtract, subtract, '-': subtract,
  mul: multiply, multiply, x: multiply, '*': multiply,
  div: divide, divide, '/': divide,
};

function main(argv) {
  const [op, rawA, rawB] = argv;
  const fn = operations[op];
  const a = Number(rawA);
  const b = Number(rawB);

  if (!fn || rawA === undefined || rawB === undefined || Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Uso: node calculator.js <add|sub|mul|div> <número1> <número2>');
    process.exit(1);
  }

  try {
    console.log(fn(a, b));
  } catch (err) {
    console.error(`Erro: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { add, subtract, multiply, divide };
