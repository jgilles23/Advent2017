//Read the input files to data
const { fail } = require('assert');
const fs = require('fs');
const { setMaxListeners } = require('process');
let data = fs.readFileSync('day13_input.txt','utf-8');
data = data.slice(0,-1).split('\n');
console.log('Input:',data.slice(0,10));

let ranges = new Array(100).fill(0);
data.forEach(line => {
    let [depth,range] = line.split(': ').map(Number);
    ranges[depth] = range;
})

let mod_ranges = ranges.map(r => {
    return 2*(r-1);
})
console.log(mod_ranges);

//severities = new Array(100).fill(0);
locations = new Array(100).fill(0);

function step(locations) {
    for (let i=0; i<locations.length; i++) {
        if (mod_ranges[i]>=0) {
            locations[i] = (locations[i]+1)%mod_ranges[i]
        }
    }
}

severity = 0;
for (let i=0;i<100;i++) {
    //console.log(locations.slice(0,5),mod_ranges.slice(0,5));
    //console.log("time",i,locations[i])
    if (mod_ranges[i]>=0 && locations[i]==0) {
        severity += i*ranges[i]
    }
    step(locations);
}

console.log('Part 1:',severity)

function tryStart(i_start) {
    let L = new Array(100).fill(0);
    for (let i=0;i<i_start;i++) {
        step(L);
    }
    for (let i=0;i<100;i++) {
        //console.log(locations.slice(0,5),mod_ranges.slice(0,5));
        //console.log("time",i,locations[i])
        if (mod_ranges[i]>=0 && L[i]==0) {
            console.log("Failure at loc",i,"mod_range",mod_ranges[i])
            return false;
        }
        step(L);
    };
    return true;
}

/*
i = 0;
while (tryStart(i) == false) {
    i++
    if (i%1000==0) {
        console.log(i)
    }
}
*/


function lcm_two_numbers(x, y) {
    //Source: //Source: https://www.w3resource.com/javascript-exercises/javascript-math-exercise-10.php
    if ((typeof x !== 'number') || (typeof y !== 'number')) 
     return false;
   return (!x || !y) ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
 }
 
 
 function gcd_two_numbers(x, y) {
     //Source: https://www.w3resource.com/javascript-exercises/javascript-math-exercise-10.php
   x = Math.abs(x);
   y = Math.abs(y);
   while(y) {
     var t = y;
     y = x % y;
     x = t;
   }
   return x;
 }


let LCM = 1;
mod_ranges.forEach(x => {
    if (x>=0) {
        LCM = lcm_two_numbers(LCM,x)
    }
})

console.log('LCM:',LCM)
/*
console.log('Part 2:',0)

let time = 0;
let locs = [];

for (i=0;i<100;i++) {
    locs.push(i);
}

slots = new Array(LCM).fill(1)
console.log(slots.length)

for (i=0;i<mod_ranges.length;i++) {
    let depth = mod_ranges[i];
    if (depth>=0) {
        console.log('loc',i,'depth',depth)
        for (j=i; j<LCM; j+=depth) {
            if (i==4 && j<50) {
                console.log(i,j)
            }
            if (j>=0) {
                slots[j] = 0;
            }
        }
    }
}

for (i=0;i<LCM;i++) {
    if (slots[i]==1) {
        break;
    }
}

console.log('Part 2:',i)

console.log(tryStart(i))
*/

function tryStartQuick(i_start,verbose=true) {
    for (i=0;i<100;i++) {
        if (mod_ranges[i]>=0) {
            let d = mod_ranges[i];
            if (i_start%d == (d-(i%d))%d) {
                if (verbose) {
                    console.log('tryStartQuick at time',i_start,'Failure at',i,'depth',mod_ranges[i])
                }
                return false
            }
        }
    }
    return true
}

function getState(time) {
    let scanners = new Array(LCM).fill(time)
    for (i=0;i<100;i++) {
        if (mod_ranges[i]>=0) {
            scanners[i] = scanners[i]%mod_ranges[i]
        }
    }
    console.log('State at time',time,scanners.slice(0,10))
}

console.log(tryStartQuick(22))

//getState(10)

k = 0;
while (tryStartQuick(k,verbose=false) == false) {
    if (k%100000==0) {
        console.log(k);
    }
    k++
}
console.log('Part 2:',k)