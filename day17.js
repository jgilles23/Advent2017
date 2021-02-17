let skipSize = 343; //puzzle input
let L, currentPosition
L = [0];
currentPosition = 0;

for (let i=1;i<2018;i++) {
    currentPosition = (currentPosition + skipSize)%L.length + 1
    L.splice(currentPosition,0,i);
}

console.log('Part 1:',L[currentPosition+1])

/*
let next = [0];
let CP = 0;
for (let i=0;i<50*10**6;i++) {
    if (i%10**6==0) {console.log(i)}
    //Take the required number of steps
    for (let j=0;j<skipSize;j++) {
        CP = next[CP];
    }
    //Insert a value
    temp = next[CP];
    next[CP] = i; //insert
    next.push(temp);
    CP = i;
    //console.log(next);
}

console.log("Part 2:",next[0]);
//console.log(next);
*/

/*
//THE SLOW WAY
let N = 50*10**6;
let next = new Array(N).fill(0);
next[0] = 0;
console.log(next);
let CP = 0;

for (let i=1;i<=N;i++) {
    if (i%10**6==0) {console.log(i)}
    //Take the required number of steps
    for (let j=0;j<skipSize;j++) {
        CP = next[CP];
    }
    //Insert a value
    temp = next[CP];
    next[CP] = i; //insert
    next[i] = temp;
    CP = i;
    //console.log(next);
}

console.log("Part 2:",next[0]);
*/

//FAST SOLUTION
let N = 50*10**6;
let pos = 0;
let atOne = 0;
for (let i=1; i<=N; i++) {
    pos = (pos + skipSize)%i + 1;
    if (pos == 1) {
        atOne = i;
    }
}
console.log("Part 2:",atOne)
