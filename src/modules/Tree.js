import Node from './Node'

export default class Tree {
    constructor(){
        this.root = null
    }

    generateRandomArray() {
        const maxLength = 25;
        const randomArray = [];
        const length = Math.floor(Math.random() * maxLength) + 1;
        for (let i = 0; i < length; i++) {
          randomArray.push(Math.floor(Math.random() * 100));
        }
        return randomArray;
    }

    buildTree(array, start, end){
        if (start > end){return null}
        var midArray = parseInt((start+end)/2)
        var node = new Node(array[midArray])
        node.left = this.buildTree(array, start, (midArray-1))
        node.right = this.buildTree(array, (midArray+1), end)
        return node
    }
    
    cleanArray(array){
        return [...new Set(array)].sort((a,b) => a - b);
    }

    prettyPrint(node, prefix = '', isLeft = true){
        if (node === null) {
           return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
    
    render(){
        const _array = this.generateRandomArray()
        const _cleanArray = this.cleanArray(_array);
        const _cleanArrayLength = _cleanArray.length;
        this.prettyPrint(this.buildTree(_cleanArray, 0, _cleanArrayLength - 1));
        console.log(_cleanArray);
        return;
        // prettyPrint(buildTree(array, 0, array.length));
    }
    
    find(node, num){
        if (!node || node.data == num){
            return node
        }
        else if (node.data < num){
            return find(node.right, num);
        }
        else {
            return find(node.left, num);
        }
    }
    
    ins(num){
        if (!this.root){
            this.root = new Node(num)
        }
        else {
            this.insNode(this.root, num)
        }
    }

    insNode(node, num){
        if (!node){
            node = new Node(num);
            return node
        }
        else if (node.data < num){
            return insNode(node.right, num);
        }
        else {
            return insNode(node.left, num);
        }
    }
    
    del(num){
        this.root = this.delNode(this.root, num)
    }
    
    delNode(node, num){
        if (!node){
            return node;
        }
        else if (node.data < num){
            return this.delNode(node.right, num);
        }
        else if (node.data > num){
            return this.delNode(node.left, num);
        }
        else {
            if(!node.left && !node.right){
                return node = null;
            }
            else if (!node.left){
                const temp = node.right;
                node.right = null;
                return temp
            }
            else if (!node.right){
                const temp = node.left;
                node.left = null;
                return temp;
            }
            else {
                node.data = this.min(node.right);
                node.right = this.delNode(node.right, node.data);
                return node;
            }
        }
    }

    min(node){
        let minVal = node.data;
        while (node.left != null){
            minVal = node.left.data;
            node = node.left;
        }
        return minVal
    }

    getHeight(node){
        if (!node){
            return 0
        }
        const leftHeight = this.getHeight(node.left);
        const rightHeight = this.getHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1
    }

    getDepth(node, num){
        var depth = -1
        if (!node){
            return -1
        }
        else if (
            (node.data == num) || 
            (depth = getDepth(node.left, num)) >= 0 || 
            (depth = getDepth(node.right, num)) >= 0)
            {
            return depth +1
            }
        return depth;
    }

    printNodeValue(node){
        console.log(node.data);
    }

    levelOrderRecursion(node, printNodeValue, level = 0){
        if (!node){
            return;
        }
        
        else if (level === 0){
            printNodeValue(node);
        }

        else if (level > 0){
            this.levelOrderRecursion(node.left, printNodeValue, level-1);
            this.levelOrderRecursion(node.right, printNodeValue, level-1);
        }

        return;
    }

    levelOrder(printNodeValue){
        const height = this.getHeight(this.root);
        for (let level = 0; level <= height; level++){
            this.levelOrderRecursion(this.root, printNodeValue, level);
        }
    }

    inOrder(node, printNodeValue){
        if (!node){
            return;
        }
        else if (!printNodeValue){
            const array = [];
            array.push(this.inOrder(node.left));
            array.push(node.data);
            array.push(this.inOrder(node.right));
            return array;
        }
        this.inOrder(node.left, printNodeValue)
        printNodeValue(node.data);
        this.inOrder(node.right,printNodeValue)
    }

    preOrder(node, printNodeValue){
        if(!node){
            return;
        }
        else if (!printNodeValue){
            const array = [];
            array.push(node.data);
            array.push(this.preOrder(node.left));
            array.push(this.preOrder(node.right));
            return array;
        }
        printNodeValue(node.data);
        this.preOrder(node.left, printNodeValue);
        this.preOrder(node.right, printNodeValue);
    }

    postOrder(node, printNodeValue){
        if(!node){
            return;
        }
        else if (!printNodeValue){
            const array = [];
            array.push(this.postOrder(node.left));
            array.push(this.postOrder(node.right));
            array.push(node.data);
            return array
        }
        this.postOrder(node.left, printNodeValue);
        this.postOrder(node.right, printNodeValue);
        printNodeValue(node.data);
    }

    isBalanced(node, getHeight){
        if (!node){
            return true;
        }
        var _left = getHeight(node.left);
        var _right = getHeight(node.right);
        if (
            (Math.abs((_left - _right) <= 1)) && 
            (this.isBalanced(node.left, getHeight)) && 
            (this.isBalanced(node.right, getHeight))
            )
            {
            return true;
            }
        return false;
    }

    storeNodes(node, nodesArray){
        if (!node){
            return;
        }

        this.storeNodes(node.left,nodesArray);
        nodesArray.push(node.data);
        this.storeNodes(node.right, nodesArray);
    }

    rebalance(node){
        if (!node){
            return;
        }
        nodesArray = []
        this.storeNodes(node, nodesArray);
        _cleanArray = this.cleanArray(nodesArray);
        _length = _cleanArray.length;
        this.buildTree(cleanArray, 0, _length - 1);
    }
}


