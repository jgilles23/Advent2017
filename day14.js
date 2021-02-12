
function knotHash(input,outputType) {
    //outputType 'hex' is the default
    //Setup default parameters
    let verbose = false;
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
    for (let r=0;r<64;r++) {
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
    if (verbose) {console.log('sparsehash',sparseHash)};
    //Create a return value of the proper type
    let output = "";
    if (outputType=='hex') {
        //Output as a standard hex
        //Convert to characters
        sparseHash.forEach(x => {
            let y = x.toString(16);
            if (y.length==1) {
                y = '0'+y;
            }
            output += y;
        })
    } else {
        //Output as a binary (4) char per standard character
        sparseHash.forEach(x => {
            output += x.toString(2).padStart(8,'0')
        })
    }
    //Return the output
    return output;
}

usedCount = 0;
mainInput = "oundnydw";
M = new Array();
for (let r=0;r<128;r++) {
    lineInput = mainInput + '-' + r.toString();
    h = knotHash(lineInput,'bin')
    usedCount += (h.match(/1/g)||[]).length
    //console.log(r,lineInput,usedCount)
    M.push(h.split("").map(Number))
}

console.log('Part 1',usedCount);

/*
a = knotHash("oundnydw",out='bin');
console.log('hash',a);
n =  (a.match(/1/g)||[]).length
console.log(n)
*/

function searchSpace(x,y) {
    if (x<0 || x>=128 || y<0 || y>=128) {
        return
    }
    if (M[x][y]==2 || M[x][y]==0) {
        return
    }
    M[x][y] = 2;
    searchSpace(x-1,y);
    searchSpace(x+1,y);
    searchSpace(x,y-1);
    searchSpace(x,y+1);
}

let groupCount = 0;
for (let i=0;i<128;i++) {
    for (let j=0;j<128;j++) {
        if (M[i][j] == 1) {
            groupCount++
            //Function to search
            searchSpace(i,j);
        }
    }
}

//searchSpace(0,9)
//console.log(M.slice(0,20).map(q => q.slice(0,40).join("").replace(/0/g," ").replace(/1/g,".")))

console.log('Part 2',groupCount)