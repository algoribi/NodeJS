const { use } = require('express/lib/application');
const readline = require('readline');
const { promisify } = require('util');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


inputTest();

function regame() {
    return new Promise(function (resolve, reject) {
        rl.question('line', function (answer) {
            if (answer == "Yes" || answer == "yes") {
                resolve(true);
            } else if (answer == "No" || answer == "no") {
                resolve(false);
            } else {
                reject();
            }
        });
    });
}


function inputTest() {
    rl.on('line', function(userInput) {
        console.log("1 : " + userInput);
        regame()
        .then(function(data) {
            console.log("2 : " + data);
        });
    });
    rl.on('pause', function() {
        console.log("chk pause");
        rl.resume();
    });
    
    /*
    const ac = new AbortController();
    const signal = ac.signal;
    const tttt = await rl.question('What is your favorite food? ', { signal });
    console.log(`Oh, so your favorite food is ${tttt}`);
    const tttt = await rl.question('What is your favorite food? ', { signal });
    console.log(`Oh, so your favorite food is ${tttt}`);
    const tttt = await rl.question('What is your favorite food? ', { signal });
    console.log(`Oh, so your favorite food is ${tttt}`);
    /*
    rl.pause();
    rl.on('pause', function() {
        console.log("chk pause");
        rl.resume();
    })
    .on('line', function(userInput) {
        console.log("fl user input : " + userInput);
        rl.pause();
    });

    /*
    rl.on('line', function(userInput) {
        console.log("fl user input : " + userInput);
        rl.pause();
    })
    .on('pause', function() {
        console.log("chk pause");
        rl.resume();
    });*/


    // rl.question('What is your favorite food? ', (answer) => {
    //     console.log(`Oh, so your favorite food is ${answer}`);
    //     rl.close();
    // });
}

/*
const util = require('util');
const question = util.promisify(rl.question).bind(rl);

async function questionExample() {
  try {
    rl.resume();
    const answer = await question('What is you favorite food? ');
    console.log(`Oh, so your favorite food is ${answer}`);
    rl.pause();
  } catch (err) {
    console.error('Question rejected', err);
  }
}

questionExample();
questionExample();

*/

