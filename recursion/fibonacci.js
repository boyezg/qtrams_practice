
function fibs(n) {
    const result = [];
    if (n <= 0) return result;
    result.push(0);
    if (n === 1) return result;
    result.push(1);
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }
    return result;
}


function calculateFibonacci() {
    const input = document.getElementById("fibonacciInput").value;
    const n = parseInt(input, 10);

    if (isNaN(n) || n <= 0) {
        document.getElementById("fibonacciOutput").innerText = "Please enter a valid positive number.";
        return;
    }

    const result = fibs(n);
    document.getElementById("fibonacciOutput").innerText = `Fibonacci Sequence: ${result.join(", ")}`;
}

// Recursive Fibonacci function
function fibsRecursive(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const result = fibsRecursive(n - 1); // Recursively get the sequence for n-1 terms
    const nextValue = result[result.length - 1] + result[result.length - 2]; // Calculate the next value
    result.push(nextValue); // Append the next value to the sequence
    return result;
}

// Calculate Fibonacci sequence using recursion
function calculateFibonacciRecursive() {
    const input = document.getElementById("fibonacciInput").value;
    const n = parseInt(input, 10);

    if (isNaN(n) || n <= 0) {
        document.getElementById("fibonacciOutput").innerText = "Please enter a valid positive number.";
        return;
    }

    const result = fibsRecursive(n);
    document.getElementById("fibonacciOutput").innerText = `Fibonacci Sequence (Recursive): ${result.join(", ")}`;
}

