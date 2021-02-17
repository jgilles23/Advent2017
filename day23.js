//Read the input files to data
//const { fail } = require('assert');
const fs = require('fs');
//const { setMaxListeners } = require('process');
let data = fs.readFileSync('day23_input.txt', 'utf-8');
data = data.slice(0, -1).split('\n').map(x => x.split(" "))
console.log('Input:', data.slice(0,10));
program = data;

//Source: https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

class stateClass {
    constructor() {
        //Make a state machine
        this.pos = 0;
        this.halted = false;
        this.verbose = false;
        this.mulCount = 0;
        this.part = 1;
        this.a = 0;
        this.b = 0;
        this.c = 0;
        this.d = 0;
        this.e = 0;
        this.f = 0;
        this.g = 0;
        this.h = 0;
    };
    val(x) {
        if (isNumeric(x)) {
            return (Number(x));
        }
        return this[x];
    };
    exe() {
        if (this.pos >= program.length) {
            this.halted = true;
            return;
        }
        let line = program[this.pos];
        //Extract values cmd, X & Y
        let cmd = line[0];
        let x = line[1]; //register or value
        let y = this.val(line[2]);
        if (this.verbose) {console.log(cmd,x,y)};
        if (cmd=='set') {
            this[x] = y;
        } else if (cmd=='sub') {
            this[x] -= y;
        } else if (cmd=='mul') {
            this[x] *= y;
            this.mulCount += 1;
        } else if (cmd=='jnz') {
            if (this.val(x) != 0) {
                this.pos += y - 1;
            }
        }
        //Iterate the position and return
        this.pos += 1;
        if (this.verbose) {this.print()};
    };
    run() {
        while (!this.isHalted()) {
            this.exe()
        }
    }
    isHalted() {
        return this.halted;
    }
    print(autolog) {
        let s = `State (pos ${this.pos}): `;
        for (const property in this) {
            if (property.length == 1) {
                s += `${property} ${this[property]}, `
            }
        }
        if (autolog===undefined || autolog==true) {console.log(s)};
        return s;
    }
}

computer = new stateClass();
computer.print();
computer.run();
computer.print();
console.log('Part 1:',computer.mulCount)

//PART 2 - Interprit the code
/*
set b 79
set c b
jnz a 2 | to 5
jnz 1 5 | to 9
mul b 100
sub b -100000
set c b
sub c -17000 //STATE: a=1, b=107900, c=124900
set f 1
set d 2
set e 2 //STATE: f=1, d=2
set g d
mul g e
sub g b
jnz g 2 | to 17 (if d*e==b, f=0)
set f 0
sub e -1 | count up e
set g e
sub g b
jnz g -8 | to 12 (if e!=b) //STATE: e=b
sub d -1 | count up d
set g d
sub g b
jnz g -13 | to 11 (if d!=b) //STATE: d=b, e=b
jnz f 2 | to 27
sub h -1
set g b
sub g c
jnz g 2 | to 31 (if b==c, HALT)
jnz 1 3 | to 33 HALT
sub b -17 | count up b + 17
jnz 1 -23 | to 9

REWRITE condensing lines
(1-8) a=1, b=107900, c=124900
(9-10) f=1, d=2
(11) e=2
(12-16) if d*e==b then f=0
(17) e += 1
(18-20) if e!=b then jump to (12)
(21) d += 1
(22-24) if d!=b then jump to (11)
(25-26) if f=0 then h += 1
(27-30) if b=c HALT
(31) b += 17
(32) jump to (9)

REWRITE as for loops, elim variables
for b = 107900 to 124900 by 17
    f=1
    for d = 2 to b
        for e = 2 to b
            if d*e==b 
            then f=0
    if f=0 
    then h += 1
HALT

REWRITE as prime number finder
for b = 107900 through 124900 by 17
    if b is composite
        h += 1
HALT
*/

function isPrime(n) {
    for (let i=2; i<=Math.sqrt(n); i++) {
        if ((n/i)%1 == 0) {
            return false
        }
    }
    return true
}

//SIMULATOR as a prime number finder
let h = 0;
for (let b=107900; b<=124900; b+=17) {
    h += !isPrime(b)
}
console.log("Part 2:",h)
