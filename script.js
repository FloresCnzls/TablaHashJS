class Node {
    constructor(key, value) {
      this.key = key;
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  class BinarySearchTree {
    constructor() {
      this.root = null;
    }

    insert(key, value) {
      const newNode = new Node(key, value);
      if (!this.root) {
        this.root = newNode;
      } else {
        this.insertNode(this.root, newNode);
      }
    }

    insertNode(node, newNode) {
      if (newNode.key < node.key) {
        if (!node.left) {
          node.left = newNode;
        } else {
          this.insertNode(node.left, newNode);
        }
      } else {
        if (!node.right) {
          node.right = newNode;
        } else {
          this.insertNode(node.right, newNode);
        }
      }
    }

    // Otros métodos como búsqueda, eliminación, etc. pueden ser agregados aquí
  }

  class HashTable {
    constructor(size) {
      this.size = size;
      this.table = Array.from({ length: size }, () => new BinarySearchTree());
    }

    hash(key) {
      return key % this.size;
    }

    insert(key, value) {
      const index = this.hash(key);
      this.table[index].insert(key, value);
    }

    // Otros métodos como búsqueda, eliminación, etc. pueden ser agregados aquí
  }

  const hashTable = new HashTable(10);

  function insertItem() {
    const key = parseInt(document.getElementById('keyInput').value);
    const value = document.getElementById('valueInput').value;
    hashTable.insert(key, value);
    displayHashTable();
  }

  function displayHashTable() {
    const tableBody = document.getElementById('hashTableBody');
    tableBody.innerHTML = '';
    hashTable.table.forEach((tree, index) => {
      const row = `
        <tr>
          <td>${index}</td>
          <td><pre class="tree">${displayTree(tree.root)}</pre></td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }

  function displayTree(node) {
    if (!node) {
      return '';
    }
    return `${node.key}: ${node.value}\n${displayTree(node.left)}${displayTree(node.right)}`;
  }