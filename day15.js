/*
Generator A starts with 873
Generator B starts with 583
*/


let AStart = 873;
let BStart = 583;
let AMult = 16807;
let BMult = 48271;
let AMatch = 4;
let BMatch = 8;
let div = 2147483647;
let matchCount,N,A,B;

matchCount = 0; //Count the matches of the last 16 bits
N = 40000000;
A = AStart;
B = BStart;
for (let i=0;i<N;i++) {
    A = (A*AMult)%div;
    B = (B*BMult)%div;
    if (A<<16 == B<<16) {
        matchCount++
    }
}

console.log("Part 1",matchCount)


N = 5*10**6;
matchCount = 0;
A = AStart;
B = BStart;
for (let i=0;i<N;i++) {
    //if (i%10**6 == 0) {console.log(i/10**6)}
    do {
        A = (A*AMult)%div;
    } while (A%AMatch != 0)
    do {
        B = (B*BMult)%div;
    } while (B%BMatch != 0)
    A16 = A << 16
    B16 = B << 16
    if (A<<16 == B<<16) {
        matchCount++
    }
}

console.log('Part 2:',matchCount)