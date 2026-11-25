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
function addition(a, b) {
  return a + b;
}

// Subtração
function subtraction(a, b) {
  return a - b;
}

// Multiplicação
function multiplication(a, b) {
  return a * b;
}

// Divisão
function division(a, b) {
  if (b === 0) {
    throw new Error('Divisão por zero não é permitida.');
  }
  return a / b;
}

const operations = {
  addition, add: addition, '+': addition,
  sub: subtraction, subtract: subtraction, '-': subtraction,
  mul: multiplication, multiply: multiplication, x: multiplication, '*': multiplication,
  div: division, divide: division, '/': division,
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

module.exports = { addition, subtraction, multiplication, division };
