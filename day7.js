//Read the input files to data
const { fail } = require('assert');
const fs = require('fs');
const { setMaxListeners } = require('process');
let data = fs.readFileSync('day7_input.txt','utf-8');
data = data.split('\n');
data.pop();
data = data.map(line => {
    return line.split(/ \(|\)|\-\> |\, /)
})
data = data.map(d => {
    struct = {
        name:d[0],
        weight:Number(d[1]),
        totalWeight:undefined,
        children:d.slice(3,),
        parent:undefined
    }
    return struct;
})
//console.log('Input Sample:',data.slice(4,8));

let tree = {};
data.forEach(d => {tree[d.name] = d})
//Record the parent of each disk
for (var key in tree) {
    tree[key].children.map(cKey => {
        tree[cKey].parent = cKey
    })
}

let root
//console.log(tree);
for (const key in tree) {
    if (!tree[key].parent) {
        root = tree[key];
        break;
    }
}

console.log("Part 1:",root.name)

function printTree(key,depth=0) {
    console.log('- '.repeat(depth) + tree[key].name + ' ' + tree[key].weight + ': ' + tree[key].totalWeight);
    tree[key].children.forEach(cKey => {
        printTree(cKey, depth+1);
    })
}

function checkBalance(key) {
    let self = tree[key];
    //No children return own weight
    if (self.children.length === 0) {
        self.totalWeight = self.weight;
        return self.totalWeight;
    }
    //Get list of weights
    weights = self.children.map(cKey => {
        return checkBalance(cKey);
    })
    //Find a discrepency
    if (!weights.every(w => weights[0]===w)) {
        //console.log(key, weights);
        //console.log('Failure Found')
        //printTree(key)
        let counts = {}
        weights.forEach(w => {
            counts[w] ? counts[w]++ : counts[w]=1;
        })
        //console.log(counts)
        let targetWeight;
        let antiTargetWeight;
        for (const key in counts) {
            if (counts[key]>1) {
                targetWeight = Number(key);
            } else if (counts[key]===1) {
                antiTargetWeight = Number(key);
            }
        }
        let deltaWeight = targetWeight - antiTargetWeight;
        let antiIndex = weights.indexOf(antiTargetWeight);
        let antiKey = tree[key].children[antiIndex];
        //console.log(targetWeight,antiTargetWeight,antiIndex,antiKey);
        console.log('Fixing Weight of',antiKey,'from',tree[antiKey].weight,'to',tree[antiKey].weight+deltaWeight);
        tree[antiKey].weight = tree[antiKey].weight+deltaWeight;
        console.log('Part 2:',tree[antiKey].weight);
        //Recalculate the tree to confirm
        //console.log(End)
        checkBalance(antiKey)
        self.totalWeight = targetWeight*self.children.length + self.weight;
        return self.totalWeight;
    } else {
        self.totalWeight = weights.reduce((a,b) => a+b) + self.weight;
        //console.log(weights);
        return self.totalWeight;
    }
}

//printTree(root.name,0)
//checkBalance(root.name)
//checkBalance('bfwbkxq')
//printTree('bfwbkxq')

//console.log(root.name)
checkBalance(root.name)