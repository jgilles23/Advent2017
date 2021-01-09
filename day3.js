let N = 347991;
//Iterate to find the maximum side length
i = 1;
while (i*i <= N) {
    i += 2
}
console.log(i,i*i);
//Iterate down to the distance from a corner
let corner = i*i;
while (corner-i+1 > N) {
    corner -= (i-1)
}
dist_mid = (i-1)/2 - (corner - N);
console.log(corner, corner-N, dist_mid);
dist = dist_mid + (i-1)/2;
console.log('Part 1:',dist);

//PART 2
function tuple(x,y) {
    //Tupelize position
    return `(${x},${y})`
}

const grid = {
    vals:{},
    get(x,y){
        //console.log(x,y,this.vals[tuple(x,y)])
        return this.vals[tuple(x,y)] || 0
    },
    set(x,y,val){
        this.vals[tuple(x,y)] = val
    },
    calculate(x,y){
        acc =   this.get(x+1,y-1) +
                this.get(x+1,y) +
                this.get(x+1,y+1) +
                this.get(x,y+1) +
                this.get(x-1,y+1) +
                this.get(x-1,y) +
                this.get(x-1,y-1) +
                this.get(x,y-1);
        //Add the sum of 
        this.set(x,y,acc);
        //console.log(acc);
        return acc;
    }
}

let x = 0;
let y = 0;
grid.set(x,y,1);

let ring = 1;

function round(){
    //Initialize
    x += 1
    y -= 1
    //right side
    do {
        y++
        if (grid.calculate(x,y) > N){return true}
    } while (y<ring)
    console.log(grid.get(x,y));
    //top
    do {
        x--;
        if (grid.calculate(x,y) > N){return true}
    } while (-x<ring)
    //left
    do {
        y--;
        if (grid.calculate(x,y) > N){return true}
    } while(-y<ring)
    //bottom
    do {
        x++;
        if (grid.calculate(x,y) > N){return true}
    } while(x<ring)
    //Make the ring larger
    ring += 1
}

//N=20;
do {
    ret = round();
} while(!ret)

//console.log(grid);
console.log('Part 2:', grid.get(x,y))

