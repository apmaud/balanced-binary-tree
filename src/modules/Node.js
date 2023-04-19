// const testArray = [1,4,2,3,5,6,7,6,7,1,2,5,7,8,9,10,23,54,32];
// const cleanedTestArray = cleanArray(testArray);
// const testArrayLength = cleanedTestArray.length;
// console.log(cleanedTestArray);

export default class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
