// Fundamental of js;
// array and objects
// function return
// async js coding

var arr = [1,2,3,4];
// for each, map, filter , indexof 

arr.forEach(function(val){
    console.log(val+ "hello");
})

var ans = arr.map(function(val){
    if(val >3){
        return true;
    }
    else{return false;}
})

console.log(ans);


var resl = arr.find(function (val){ // return the index
    if(val==1){return true;}
})

console.log(resl);

var res2 = arr.indexOf(2); // return index or -1 if not present
console.log(res2); 


// object in js

var obj = {
    name:'pankaj',
    age:24
}

console.log(obj['name']);
console.log(obj['age']);

Object.freeze(obj); // after this line changes in object is not possible

// obj.age = 25; // invalid as Object.freeze(obj) is ON;



// functions 

function abcd(a,b,c,d){
}
console.log(abcd.length);
console.log(typeof(abcd));


function ab(){
    return "hello-world";
}

var message = ab();
console.log(message);


// async coding in js

var blob = await fetch(`https://randomuser.me/api/`);
var res = await blob.json();
console.log(res);
