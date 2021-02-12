//Read the input files to data
const { fail } = require('assert');
const fs = require('fs');
const { setMaxListeners } = require('process');
let data = fs.readFileSync('day10_input.txt','utf-8');
data = data.slice(0,-1).split(',').map(Number)
//console.log('Input:',data.slice(0,100));

const N = 256;

let L = [...Array(N).keys()];

function rev(start,length) {
    let j = start%N;
    let k = (start+length-1)%N;
    //console.log(j,k);
    //console.log(L);
    while ((j!=k) && (k+1!=j)) {
        const x = L[j];
        L[j] = L[k];
        L[k] = x;
        j = (j+1)%N;
        k = (k-1+N)%N;
    }
}

let skipSize = 0;
let i = 0;

function applyLengthList(lengthList) {
    //console.log(i,skipSize)
    lengthList.forEach(d => {
        //Reverse a portion of the list
        rev(i,d);
        //Update i
        i = (i + d + skipSize)%N;
        skipSize = (skipSize + 1)%N;
    })
    //console.log(i,skipSize);
}

applyLengthList(data)
//console.log(L)
console.log('Part 1:',L[0]*L[1])


//PART 2
rounds = 64;

//Re-read in the data
data = fs.readFileSync('day10_input_test.txt','utf-8');
data = data.slice(0,-2);
let lengthList = data.split('').map(d => d.charCodeAt(0));
lengthList.push(...[17, 31, 73, 47, 23]);
console.log(lengthList);
//Reset L,i,skip
L = [...Array(N).keys()];
i = 0;
skipSize = 0;
while (rounds>0) {
    applyLengthList(lengthList)
    rounds--;
}
//console.log(L)

let bitwiseXOred = [];
for (let i=0; i<N; i+= 16) {
    let y = L.slice(i,i+16).reduce((acc,x) => acc^x);
    y = y.toString(16);
    if (y.length==1) {
        y = '0'+y
    }
    bitwiseXOred.push(y);
}
console.log(bitwiseXOred);
hash = bitwiseXOred.join('');
//console.log('Part 2:',hash)

function knotHash(input,verbose=true) {
    //convert input to ascii codes
    let inputBytes = [];
    for (i=0;i<input.length;i++) {
        inputBytes.push(input.charCodeAt(i))};
    //Add standard bytes
    inputBytes.push(17, 31, 73, 47, 23);
    if (verbose) {console.log('inputBytes',inputBytes)};
    //Setup initial variables
    let L = []; //Create the starting list
    for (i=0;i<256;i++) {L.push(i)};
    let currentPosition = 0;
    let skipSize = 0;
    //Run for 64 rounds
    for (r=0;r<64;r++) {
        //Update for each inputByte
        inputBytes.forEach( reverseLength => {
            let a = currentPosition; //start of reverse
            let b = (a + reverseLength - 1)%256; //end of reverse
            let aStop = (a + Math.floor(reverseLength/2))%256; //value of a to stop on
            while (a!=aStop) { 
                //Complete 1 round of reversals
                const temp = L[b];
                L[b] = L[a];
                L[a] = temp;
                //update variables
                a += 1;
                if (a==256) {a=0};
                b -= 1;
                if (b==-1) {b=255};
            }
            currentPosition = (currentPosition + reverseLength + skipSize)%256; //Push current position
            skipSize = (skipSize + 1)%256 //increase skip
        })
    }
    //Save as sparse hash
    let sparseHash = new Array();
    let block = L[0];
    for (i=1;i<256;i++) {
        if (i%16 == 0) {
            sparseHash.push(block);
            block = L[i];
        } else {
            block = block ^ L[i];
        }
    }
    sparseHash.push(block);
    //Convert to characters
    let output = '';
    sparseHash.forEach(x => {
        let y = x.toString(16);
        if (y.length==1) {
            y = '0'+y;
        }
        output += y;
    })
    //Return the output
    if (verbose) {console.log(output)};
    return output;
}

//knotHash("1,2,3")
let A = knotHash("225,171,131,2,35,5,0,13,1,246,54,97,255,98,254,110")
console.log('Part 2',A)