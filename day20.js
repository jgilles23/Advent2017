//Read the input files to data
//const { fail } = require('assert');
const { Console } = require('console');
const fs = require('fs');
//const { setMaxListeners } = require('process');
let data = fs.readFileSync('day20_input.txt', 'utf-8');
data = data.slice(0, -1).split('\n');
//console.log('Input:', data.slice(0,10));

let P = [];
let V = [];
let A = [];
data.forEach(line => {
    let [p,v,a] = line.split(', ').map(x => x.slice(3,-1).split(',').map(Number));
    P.push(p);
    V.push(v);
    A.push(a);
})
//console.log(P.slice(0,10),V.slice(0,10),A.slice(0,10))

function absolute(X) {
    return X.map(x => Math.abs(x[0])+Math.abs(x[1])+Math.abs(x[2]))
}

//Find the lowest accleration
let absA = absolute(A);
let absV = absolute(V);
let absP = absolute(P);

let absX = [];
for (let i=0; i<A.length; i++) {
    absX.push(absA[i]*10**12 + absV[i]*10**6 + absP[i]);
}
let minX = Math.min(...absX)
let minInd = absX.indexOf(minX)
console.log('Part 1:',minInd)

function collided2(x,y) {
    return (x[0]==y[0] && x[1]==y[1] && x[2]==y[2])
}

function collideAll() {
    let toBeRemoved = new Set();
    for (let i=0; i<P.length; i++) {
        for (let j=i+1; j<P.length; j++) {
            if (collided2(P[i],P[j])) {
                toBeRemoved.add(i);
                toBeRemoved.add(j);
            }
        }
    }
    //Convert toBeRemoved to array and sort
    toBeRemoved = Array.from(toBeRemoved);
    toBeRemoved = toBeRemoved.sort((a, b) => b - a);
    //console.log('Removed',toBeRemoved);
    for (let i=0; i<toBeRemoved.length; i++) {
        A.splice(toBeRemoved[i],1);
        V.splice(toBeRemoved[i],1);
        P.splice(toBeRemoved[i],1);
    }
}

function update(X,Y) {
    //Update X with Y (e.g. X is pos, Y is vel)
    for (let i=0; i<X.length; i++) {
        X[i][0] += Y[i][0];
        X[i][1] += Y[i][1];
        X[i][2] += Y[i][2];
    }
}

function step() {
    update(V,A);
    update(P,V);
}

for (let i=0; i<100; i++) {
    console.log(`Step ${i}, Remaining ${P.length}`)
    collideAll()
    step()
}

console.log('Part 2:',P.length)