(()=>{"use strict";class t{constructor(t){this.data=t,this.left=null,this.right=null}}(new class{constructor(){this.root=null}generateRandomArray(){const t=[],r=Math.floor(25*Math.random())+1;for(let e=0;e<r;e++)t.push(Math.floor(100*Math.random()));return t}buildTree(r,e,i){if(e>i)return null;var s=parseInt((e+i)/2),h=new t(r[s]);return h.left=this.buildTree(r,e,s-1),h.right=this.buildTree(r,s+1,i),h}cleanArray(t){return[...new Set(t)].sort(((t,r)=>t-r))}prettyPrint(t,r="",e=!0){null!==t&&(null!==t.right&&this.prettyPrint(t.right,`${r}${e?"│   ":"    "}`,!1),console.log(`${r}${e?"└── ":"┌── "}${t.data}`),null!==t.left&&this.prettyPrint(t.left,`${r}${e?"    ":"│   "}`,!0))}render(){const t=this.generateRandomArray(),r=this.cleanArray(t),e=r.length;this.prettyPrint(this.buildTree(r,0,e-1)),console.log(r)}find(t,r){return t&&t.data!=r?t.data<r?find(t.right,r):find(t.left,r):t}ins(r){this.root?this.insNode(this.root,r):this.root=new t(r)}insNode(r,e){return r?r.data<e?insNode(r.right,e):insNode(r.left,e):r=new t(e)}del(t){this.root=this.delNode(this.root,t)}delNode(t,r){if(t){if(t.data<r)return this.delNode(t.right,r);if(t.data>r)return this.delNode(t.left,r);if(t.left||t.right){if(t.left){if(t.right)return t.data=this.min(t.right),t.right=this.delNode(t.right,t.data),t;{const r=t.left;return t.left=null,r}}{const r=t.right;return t.right=null,r}}return null}return t}min(t){let r=t.data;for(;null!=t.left;)r=t.left.data,t=t.left;return r}getHeight(t){if(!t)return 0;const r=this.getHeight(t.left),e=this.getHeight(t.right);return Math.max(r,e)+1}getDepth(t,r){var e=-1;return t?t.data==r||(e=getDepth(t.left,r))>=0||(e=getDepth(t.right,r))>=0?e+1:e:-1}printNodeValue(t){console.log(t.data)}levelOrderRecursion(t,r,e=0){t&&(0===e?r(t):e>0&&(this.levelOrderRecursion(t.left,r,e-1),this.levelOrderRecursion(t.right,r,e-1)))}levelOrder(t){const r=this.getHeight(this.root);for(let e=0;e<=r;e++)this.levelOrderRecursion(this.root,t,e)}inOrder(t,r){if(t){if(!r){const r=[];return r.push(this.inOrder(t.left)),r.push(t.data),r.push(this.inOrder(t.right)),r}this.inOrder(t.left,r),r(t.data),this.inOrder(t.right,r)}}preOrder(t,r){if(t){if(!r){const r=[];return r.push(t.data),r.push(this.preOrder(t.left)),r.push(this.preOrder(t.right)),r}r(t.data),this.preOrder(t.left,r),this.preOrder(t.right,r)}}postOrder(t,r){if(t){if(!r){const r=[];return r.push(this.postOrder(t.left)),r.push(this.postOrder(t.right)),r.push(t.data),r}this.postOrder(t.left,r),this.postOrder(t.right,r),r(t.data)}}isBalanced(t,r){if(!t)return!0;var e=r(t.left),i=r(t.right);return!!(Math.abs(e-i<=1)&&this.isBalanced(t.left,r)&&this.isBalanced(t.right,r))}storeNodes(t,r){t&&(this.storeNodes(t.left,r),r.push(t.data),this.storeNodes(t.right,r))}rebalance(t){t&&(nodesArray=[],this.storeNodes(t,nodesArray),_cleanArray=this.cleanArray(nodesArray),_length=_cleanArray.length,this.buildTree(cleanArray,0,_length-1))}}).render()})();