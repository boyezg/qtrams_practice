// Node and LinkedList Classes
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    prepend(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    pop() {
        if (!this.head) return;
        if (this.size === 1) {
            this.head = null;
        } else {
            let current = this.head;
            while (current.next && current.next.next) {
                current = current.next;
            }
            current.next = null;
        }
        this.size--;
    }

    find(value) {
        let current = this.head;
        let index = 0;
        while (current) {
            if (current.value === value) return index;
            current = current.next;
            index++;
        }
        return -1;
    }

    insertAt(value, index) {
        if (index < 0 || index > this.size) return;
        const newNode = new Node(value);
        if (index === 0) {
            this.prepend(value);
        } else {
            let current = this.head;
            for (let i = 0; i < index - 1; i++) {
                current = current.next;
            }
            newNode.next = current.next;
            current.next = newNode;
            this.size++;
        }
    }

    removeAt(index) {
        if (index < 0 || index >= this.size) return;
        if (index === 0) {
            this.head = this.head.next;
        } else {
            let current = this.head;
            for (let i = 0; i < index - 1; i++) {
                current = current.next;
            }
            current.next = current.next.next;
        }
        this.size--;
    }

    toString() {
        if (!this.head) return "( LinkedList is empty )";
        let result = "";
        let current = this.head;
        while (current) {
            result += `( ${current.value} ) -> `;
            current = current.next;
        }
        result += "null";
        return result;
    }
}

// Initialize LinkedList
const linkedList = new LinkedList();

// DOM Elements
const valueInput = document.getElementById("valueInput");
const appendButton = document.getElementById("appendButton");
const prependButton = document.getElementById("prependButton");
const popButton = document.getElementById("popButton");
const findButton = document.getElementById("findButton");
const insertButton = document.getElementById("insertButton");
const removeButton = document.getElementById("removeButton");
const linkedListOutput = document.getElementById("linkedListOutput");

// Update Output
const updateOutput = () => {
    linkedListOutput.textContent = linkedList.toString();
};

// Event Listeners
appendButton.addEventListener("click", () => {
    if (valueInput.value) {
        linkedList.append(valueInput.value);
        valueInput.value = "";
        updateOutput();
    }
});

prependButton.addEventListener("click", () => {
    if (valueInput.value) {
        linkedList.prepend(valueInput.value);
        valueInput.value = "";
        updateOutput();
    }
});

popButton.addEventListener("click", () => {
    linkedList.pop();
    updateOutput();
});

findButton.addEventListener("click", () => {
    const index = linkedList.find(valueInput.value);
    linkedListOutput.textContent =
        index !== -1 ? `Found "${valueInput.value}" at index ${index}` : `"${valueInput.value}" not found`;
});

insertButton.addEventListener("click", () => {
    const index = parseInt(prompt("Enter index to insert at:"));
    if (!isNaN(index)) {
        linkedList.insertAt(valueInput.value, index);
        valueInput.value = "";
        updateOutput();
    }
});

removeButton.addEventListener("click", () => {
    const index = parseInt(prompt("Enter index to remove from:"));
    if (!isNaN(index)) {
        linkedList.removeAt(index);
        updateOutput();
    }
});
