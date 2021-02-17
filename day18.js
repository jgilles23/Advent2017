//Read the input files to data
//const { fail } = require('assert');
const fs = require('fs');
//const { setMaxListeners } = require('process');
let data = fs.readFileSync('day18_input.txt', 'utf-8');
data = data.slice(0, -1).split('\n').map(x => x.split(" "))
console.log('Input:', data.slice(0,10));
program = data;

//Source: https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

//Source: https://dustinpfister.github.io/2017/09/02/js-whats-wrong-with-modulo/
function modulo(x, m) {
    return (x % m + m) % m; 
}

//console.log(isNumeric('-5'));

class stateClass {
    constructor(part, myID) {
        /*
        Inputs:
        - part: 1 or 2, advent of code part number for the machine
        - myID: integer to set the ID of this machine to, will be set as value of "p", May be left undefined for part 1;

        Other Requirements:
        - Partner must be set after construction
        */
        this.part = part;
        this.lastSound = undefined;
        this.pos = 0;
        this.halted = false;
        this.verbose = false;
        this.sendCount = 0; //Count answer for P2
        this.buffer = [];
        if (part==2) {
            this.ID = myID;
            this.partner = undefined;
        } else {
            this.ID = 0;
        };
        this["p"] = this.ID;
    };
    val(x) {
        if (isNumeric(x)) {
            return (Number(x));
        }
        if (x in this) {
            return this[x];
        }
        this[x] = 0;
        return 0;
    };
    exe() {
        //Stop the program being halted
        this.halted = false;
        let line = program[this.pos];
        //Extract values X & Y
        let cmd = line[0];
        let x = line[1]; //register
        if (isNumeric(x)) { //HACKY ALERT -- if x is a number sets this.x = x to have things work later, otherwise the "jmp 1 x" command fails
            this[x] = x;
        }
        if (!(x in this)) {
            this[x] = 0;
        }
        let y;
        if (line.length >= 2) {
            y = this.val(line[2]); //value
        }
        if (this.verbose) {console.log(cmd,x,y)};
        if (cmd=='snd') {
            this.sendCount += 1;
            //Send command changes based on part
            if (this.part==1) {
                this.lastSound = this.val(x);
            } else { //Part 2
                this.partner.buffer.push(this[x])
            }
        } else if (cmd=='set') {
            this[x] = y;
        } else if (cmd=='add') {
            this[x] += y;
        } else if (cmd=='mul') {
            this[x] *= y;
        } else if (cmd=='mod') {
            this[x] = modulo(this[x], y);
        } else if (cmd=='rcv') {
            //Different for part 1 & 2
            if (this.part == 1) {
                if (this[x] != 0) {
                    this.halted = true;
                } else {
                    //Do nothing
                }
            } else { //Part 2
                if (this.buffer.length > 0) {
                    this[x] = this.buffer[0];
                    this.buffer.shift();
                } else {
                    //Wait to be run again when there is a buffer
                    if (this.verbose) {
                        console.log(`State${this.ID} waiting`)
                    }
                    this.halted = true;
                    return
                }
            }
        } else if (cmd=='jgz') {
            if (this[x] > 0) {
                this.pos += y - 1;
            } else {
                //Do nothing
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
        if (this.halted==true && this.buffer.length==0) {
            return true;
        } else {
            return false;
        }
    }
    print() {
        let s = `State${this.ID} (pos ${state.pos}, last ${state.lastSound}): `;
        for (const property in this) {
            if (property.length == 1) {
                s += `${property} ${this[property]}, `
            }
        }
        console.log(s);
    }
}

let state = new stateClass(1,0);
state.print();
//state.verbose = true;
state.run();
console.log('Part 1:',state.lastSound)

let A = new stateClass(2,0);
let B = new stateClass(2,1);
A.partner = B;
B.partner = A;
//A.verbose = true;
//B.verbose = true;

//console.log(A)

while (!(A.isHalted() && B.isHalted())) {
    //console.log('Run 0',A.buffer);
    A.run();
    //console.log('Run 1',B.buffer)
    B.run();
};

console.log('Part 2:',B.sendCount)
