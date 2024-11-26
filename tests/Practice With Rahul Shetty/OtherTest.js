const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sum = 0;

for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 === 0) {
        sum += array[i] * array[i];
    }
}

console.log("Sum of squares of even numbers: " + sum);