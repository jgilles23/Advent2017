//Read the input files to data
const fs = require('fs');
let data = fs.readFileSync('day4_input.txt','utf-8');
console.log('Input Sample:',data.slice(0,100));

let passphrases = data.split("\n");
passphrases.pop();
passphrases = passphrases.map((p) => {return p.split(" ")});
//console.log(passphrases);

let validCount = 0;
passphrases.forEach(p => {
    let unique = new Set();
    p.forEach(w => {unique.add(w)})
    //console.log(unique.size, p.length)
    if (unique.size === p.length) {
        validCount += 1;
    }
})

console.log("Part 1:",validCount)

let anagrams = passphrases.map(p => {
    let passphrase = p.map(w => {
        let word = w.split("");
        word.sort();
        word = word.join("");
        return word;
    })
    return passphrase;
})
console.log(anagrams.slice(0,1))


let validCount2 = 0
anagrams.forEach(p => {
    let unique = new Set();
    p.forEach(w => {unique.add(w)})
    //console.log(unique.size, p.length)
    //console.log(unique)
    if (unique.size === p.length) {
        validCount2 += 1;
    }
})

console.log("Part 2:",validCount2)