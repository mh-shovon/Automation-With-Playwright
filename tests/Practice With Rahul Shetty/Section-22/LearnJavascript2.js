console.log("Step :: 1 ---------------->>");
const flag = true;
if(!flag){
    console.log("Condition matched")
}else {
    console.log("Condition not matched")
}

console.log("Step :: 2 ---------------->>");
let i = 0
while(i < 10) {
    i++
    console.log(i)
}

console.log("Step :: 3 ---------------->>");
let k = 0;
do {
    k++;
    console.log(k);
}while (k < 10);

console.log("Step :: 4 ---------------->>");
for(let j = 0; j <= 10; j++) {
    console.log(j);
}

console.log("Step :: 5 ---------------->>");
for(let l = 1; l <= 10; l++) {
    if(l % 2 === 0 && l % 3 === 0 ){
        console.log(l);
    }
}

console.log("Step :: 6 ---------------->>");
let n = 0;
for(let l = 1; l <= 100; l++) {
    if(l % 2 === 0 && l % 5 === 0 ){
        n++
        console.log(l);
        if(n === 5) {
            break;
        }
    }
}