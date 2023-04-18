const testArray = [1,4,2,3,5,6,7,6,7,1,2,5,7,8,9,10,23,54,32];
const cleanedTestArray = cleanArray(testArray);
const testArrayLength = cleanedTestArray.length;
console.log(cleanedTestArray);

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(){
        this.root = null
    }

    buildTree(array, start, end){
        if (start > end){return null}
        var midArray = parseInt((start+end)/2)
        var node = new Node(array[midArray])
        node.left = buildTree(array, start, (midArray-1))
        node.right = buildTree(array, (midArray+1), end)
        return node
    }
    
    cleanArray(array){
        return [...new Set(array)].sort((a,b) => a - b);
    }
    
    render(){
        prettyPrint(buildTree(cleanedTestArray, 0, testArrayLength-1));
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

    printNodeValue(node){
        console.log(node.data);
    }

    levelOrderRecursion(node, printNodeValue, level = 0){
        if (!node){
            return;
        }
        
        else if (level === 0){
            this.printNodeValue(node);
        }

        else if (level > 0){
            this.levelOrderRecursion(node.left, this.printNodeValue, level-1);
            this.levelOrderRecursion(node.right, this.printNodeValue, level-1);
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


    

}

prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}
