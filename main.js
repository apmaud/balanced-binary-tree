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
        if (node == null || node.data == num){
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
        if (node == null){
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
        if (!this.root){
            return
        }
        else {
            this.delNode(this.delNode(this.root, num))
        }
    }
    
    delNode(node, num){

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
