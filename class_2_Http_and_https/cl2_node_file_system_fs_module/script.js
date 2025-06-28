const fs = require('fs');

function callback(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Completed");
    }
}


//writefile, appendfile, copyfile, rename, unlink

// fs.writeFile("Hey.txt","Hello-World",function(err){
//     if(err){console.log(err)}
//     else{
//         console.log("Done");
//     }
// })

// fs.appendFile("Hey.txt","Hello-India",function(err){
//     if(err){console.log(err)}
//     else{
//         console.log("Done");
//     }
// })

// fs.rename("Hey.txt","demo.txt", function(err){
//     if(err){console.log(err)}
//     else{
//         console.log("Done");
//     }
// });


fs.copyFile("demo.txt","hello.txt",callback);

fs.unlink("demo.txt",callback);


// fs.rmdir("./copy",{recursive:true},callback); // recursive true remove all file inside it also

// Home work _ readfile, readfolder, 