// IMC = (Peso/Altura)ao quadrado

console.log('Bem Vindo a calculadora de IMC.');
console.log();

const peso = parseFloat(prompt('Informe seu peso em kg'));
const altura = parseFloat(prompt('Informe sua altura em metros'));

if (!isNaN(peso) && !isNaN(altura) && altura > 0) {
    const imc = peso / (altura * altura);
    console.log(`Seu IMC é: ${imc.toFixed(2)}`);
} else {
    console.log('Por favor, informe valores válidos para peso e altura.');
}
console.log('Bem Vindo a calculadora de IMC.');
console.log();

// Convertendo os valores para números
const pesoNum = parseFloat(peso);
const alturaNum = parseFloat(altura);

// Calculando o IMC corretamente
const imc = pesoNum / (alturaNum * alturaNum);

console.log(`Seu IMC é: ${imc.toFixed(2)}`);
