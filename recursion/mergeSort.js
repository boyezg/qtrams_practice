
function merge(left, right) {
    const sortedArray = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sortedArray.push(left.shift());
        } else {
            sortedArray.push(right.shift());
        }
    }
    return [...sortedArray, ...left, ...right];
}


function mergeSort(arr) {
    if (arr.length <= 1) return arr; 
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}


function performMergeSort() {
    const input = document.getElementById("mergeSortInput").value;
    const array = input.split(",").map(Number);

    if (array.some(isNaN)) {
        document.getElementById("mergeSortOutput").innerText = "Please enter a valid list of numbers separated by commas.";
        return;
    }

    const result = mergeSort(array);
    document.getElementById("mergeSortOutput").innerText = `Sorted Array: ${result.join(", ")}`;
}
