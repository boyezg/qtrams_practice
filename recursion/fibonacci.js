
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
