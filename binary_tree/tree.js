class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class BinarySearchTree {
    constructor(array) {
      const sortedArray = [...new Set(array)].sort((a, b) => a - b);
      this.root = this.buildTree(sortedArray);
    }
  
    buildTree(arr) {
      if (!arr.length) return null;
      const mid = Math.floor(arr.length / 2);
      const node = new Node(arr[mid]);
      node.left = this.buildTree(arr.slice(0, mid));
      node.right = this.buildTree(arr.slice(mid + 1));
      return node;
    }
  
    insert(value, node = this.root) {
      if (!node) return new Node(value);
  
      if (value < node.data) node.left = this.insert(value, node.left);
      else if (value > node.data) node.right = this.insert(value, node.right);
  
      return node;
    }
  
    delete(value, node = this.root) {
      if (!node) return null;
  
      if (value < node.data) node.left = this.delete(value, node.left);
      else if (value > node.data) node.right = this.delete(value, node.right);
      else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        const minNode = this.findMin(node.right);
        node.data = minNode.data;
        node.right = this.delete(minNode.data, node.right);
      }
  
      return node;
    }
  
    find(value, node = this.root) {
      if (!node || node.data === value) return node;
      return value < node.data ? this.find(value, node.left) : this.find(value, node.right);
    }
  
    findMin(node) {
      while (node.left) node = node.left;
      return node;
    }
  
    levelOrder(callback) {
      if (!callback) throw new Error("Callback function is required!");
      const queue = [this.root];
      while (queue.length) {
        const current = queue.shift();
        callback(current);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }
  
    inOrder(callback, node = this.root) {
      if (!node) return;
      this.inOrder(callback, node.left);
      callback(node);
      this.inOrder(callback, node.right);
    }
  
    preOrder(callback, node = this.root) {
      if (!node) return;
      callback(node);
      this.preOrder(callback, node.left);
      this.preOrder(callback, node.right);
    }
  
    postOrder(callback, node = this.root) {
      if (!node) return;
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.right);
      callback(node);
    }
  
    height(node) {
      if (!node) return -1;
      return 1 + Math.max(this.height(node.left), this.height(node.right));
    }
  
    depth(node, current = this.root, level = 0) {
      if (!current) return -1;
      if (node.data === current.data) return level;
      return node.data < current.data
        ? this.depth(node, current.left, level + 1)
        : this.depth(node, current.right, level + 1);
    }
  
    isBalanced(node = this.root) {
      if (!node) return true;
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      return (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        this.isBalanced(node.left) &&
        this.isBalanced(node.right)
      );
    }
  
    rebalance() {
      const values = [];
      this.inOrder(node => values.push(node.data));
      this.root = this.buildTree(values);
    }
  
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
      if (!node) return;
      if (node.right) this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left) this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  
  // Example Usage
  const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  const bst = new BinarySearchTree(array);
  
  console.log("Tree structure:");
  bst.prettyPrint();
  
  console.log("Is balanced:", bst.isBalanced());
  
  console.log("Level Order:");
  bst.levelOrder(node => console.log(node.data));
  
  console.log("Pre Order:");
  bst.preOrder(node => console.log(node.data));
  
  console.log("Post Order:");
  bst.postOrder(node => console.log(node.data));
  
  console.log("In Order:");
  bst.inOrder(node => console.log(node.data));
  
  // Unbalancing tree
  [150, 200, 300].forEach(val => bst.insert(val));
  console.log("Tree after unbalancing:");
  bst.prettyPrint();
  
  console.log("Is balanced:", bst.isBalanced());
  
  // Rebalancing tree
  bst.rebalance();
  console.log("Tree after rebalancing:");
  bst.prettyPrint();
  
  console.log("Is balanced:", bst.isBalanced());
  