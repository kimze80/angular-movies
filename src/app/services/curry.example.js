const suma = (a, b) => a + b;

suma(2, 3); // 5

const sumaCurried = a => b => a + b;


const add2 = sumaCurried(2)

add2(3) // 5
