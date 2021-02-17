//Read the input files to data
//const { fail } = require('assert');
const { Console } = require('console');
const fs = require('fs');
//const { setMaxListeners } = require('process');
let data = fs.readFileSync('day21_input.txt', 'utf-8');
data = data.slice(0, -1).split('\n');
console.log('Input:', data.slice(0,10));

function toMatrix(compact) {
    return compact.split('/').map(x => x.split(""))
}

function toCompact(matrix) {
    return matrix.map(x => x.join("")).join("/")
}

function print(x) {
    if (typeof x == "string") {
        x = toMatrix(x)
    }
    console.log("-------")
    console.log(x.map(y => y.join("")).join("\n"))
}

function rotate(m) {
    //Rotates a 2x2 or 3x3 matrix
    if (m.length == 2) {
        return [[m[1][0], m[0][0]],
                [m[1][1], m[0][1]]]
    } else if (m.length == 3) {
        return [[m[2][0], m[1][0], m[0][0]],
                [m[2][1], m[1][1], m[0][1]],
                [m[2][2], m[1][2], m[0][2]]]
    } else {
        console.log("ATTEMPTED TO ROTATE BIG MATRIX")
    }
}

function flip(m) {
    //Flips matrix about vertical axis
    return m.map(x => x.reverse())
}

//Convert the input data into a lookup object
//Keys and Values in Matrix format
enhancements = {};
data.forEach(line => {
    let [x,y] = line.split(" => ")
    x = toMatrix(x);
    y = toMatrix(y);
    enhancements[x] = y;
    x = rotate(x);
    enhancements[x] = y;
    x = rotate(x);
    enhancements[x] = y;
    x = rotate(x);
    enhancements[x] = y;
    x = flip(x);
    enhancements[x] = y;
    x = rotate(x);
    enhancements[x] = y;
    x = rotate(x);
    enhancements[x] = y;
    x = rotate(x);
    enhancements[x] = y;
})

function* squareIter(stop,step) {
    if (step === undefined) {
        step = 1;
    }
    for (let i=0; i<stop; i+=step) {
        for (let j=0; j<stop; j+=step) {
            yield [i,j]
        }
    }
}

function enhance(m) {
    //Enhance the image one round
    let oldFragSize, newFragSize
    if (m.length%2 == 0) {
        oldFragSize = 2;
        newFragSize = 3;
    } else {
        oldFragSize = 3;
        newFragSize = 4;
    }
    let fragCount = m.length/oldFragSize;
    let newSize = fragCount*newFragSize;
    //Create new container
    n = []
    for (let i=0; i<newSize; i++) {
        n.push(new Array(newSize));
    }
    //Iterate through fragments of old
    for (let [y,x] of squareIter(m.length,oldFragSize)) {
        //Grab a fragment
        let fragment = [];
        for (let j=0; j<oldFragSize; j++) {
            fragment.push(m[y+j].slice(x,x+oldFragSize));
        }
        //Enhance the fragment
        fragment = enhancements[fragment];
        //Insert into the new array
        y = y*newFragSize/oldFragSize;
        x = x*newFragSize/oldFragSize;
        for (let [j,i] of squareIter(newFragSize)) {
            n[y+j][x+i] = fragment[j][i];
        }
    }
    //Return the enhanced matrix
    return n
}

function iterate(m,iterations,verbose) {
    if (!verbose) {verbose=false};
    let i;
    for (i=0; i<iterations; i++) {
        if (verbose) {
            console.log(i);
            print(m)
        };
        m = enhance(m);
    }
    if (verbose) {
        console.log(i);
        print(m)
    };
    return m;
}

function countOn(m) {
    //Count the number of "on" pixles
    let count = 0;
    for ([j,i] of squareIter(m.length)) {
        count += m[j][i]==="#";
    }
    return count;
}

let inputCompact = ".#./..#/###"; //Starting array
let inputMatrix = toMatrix(inputCompact);
let m
m = iterate(inputMatrix,5,false);
console.log("Part 1:",countOn(m));

m = iterate(inputMatrix,18,false);
console.log("Part 2:",countOn(m));