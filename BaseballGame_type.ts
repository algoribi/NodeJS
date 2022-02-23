const readline = require('readline');
const utils = require("util");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = utils.promisify(rl.question).bind(rl);

function finishGame() {
    rl.close();
}

async function baseballGame() {
    gameTitlePrint();
    const answerNumberArray : number[] = makeAnswerNumber();

    while(true) {
        const userInput : string = await question("* 숫자를 입력 하세요 : ");
        if (checkGiveUp(userInput)) {
            console.log(`정답 : ${answerNumberArray}\n`);
            break;
        } else {
            const srcNumberStrings : string[] = userInput.split(' '); 

            if (!checkInputFormat(srcNumberStrings)) {
                inputGuidePrint();
            } else {
                const numbers : number[] = srcNumberStrings.map((src : any) => Number(src));
                const [strikeCount, ballCount] = compareUserNumber(answerNumberArray, numbers);

                printCompareResult(strikeCount, ballCount);

                if (checkWin(strikeCount, ballCount)) {
                    break;
                }
            }
        }
    }
}

function gameTitlePrint() {
    console.log("\n----------------숫자 야구 게임----------------");
    console.log("* 사용되는 숫자는 0 ~ 9의 서로 다른 숫자입니다.");
    console.log("* 숫자는 맞지만 위치가 틀렸을 때는 볼");
    console.log("* 숫자와 위치가 전부 맞으면 스트라이크");
    console.log("* 숫자와 위치가 전부 틀리면 아웃\n");
    
    console.log("-------새 게임을 시작합니다!-------");
}

function makeAnswerNumber() {
    const numbers : number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const answerNumberArray : number[] = [];

    for (let i = 0; i <3; i++) {
        const pickNum : number = Math.floor(Math.random() * numbers.length);
        answerNumberArray.push(numbers[pickNum]);
        numbers.splice(pickNum, 1);
    }

    return answerNumberArray;
}

function checkInputFormat(userArr : string[]) {
    let checkInputForm : boolean = true;

    if (userArr.length !== 3) {
        checkInputForm = false;
    } else {
        userArr.forEach((user, i, userArr) => {
            if (user.length !== 1 || !isNumeric(user)) {
                checkInputForm = false;
            } else if (i !== 0 && userArr[i - 1] === user) {
                checkInputForm = false;
            }
        });
    }

    return checkInputForm;
}

function inputGuidePrint() {
    console.log("---------------------입력 안내--------------------------")
    console.log("* 입력은 공백을 구분으로 세 개의 숫자를 입력받습니다.");
    console.log("* 숫자는 0부터 9 사이의 양의 자연수입니다.");
    console.log("* 중복 입력은 허용하지 않습니다. ex) 1 1 2 => 1의 중복 입력");
    console.log("* 'give up'을 입력 시에 게임을 포기하는 것으로 간주하고 답을 출력합니다.\n");

    console.log("> 옳은 값으로 다시 입력해 주세요.")
}

function compareUserNumber(answerArr : number[], userArr : number[]) {
    let strike : number = 0;
    let ball : number = 0;

    answerArr.forEach((answer, i) => {
        userArr.forEach((user, j) => {
            if (user === answer && i === j) {
                strike++;
            } else if (user === answer && i !== j) {
                ball++;
            }
        });
    });
    
    return [strike, ball];
}

function checkWin(strikeCount : number, ballCount : number) {
    return strikeCount === 3;
}

function checkGiveUp(userInput : string) {
    return userInput.toLowerCase() === 'give up';
}

function isNumeric(val : string) {
    return /^-?\d+$/.test(val);
}

function printCompareResult(strike : number, ball : number) {
    if (strike === 3) {
        console.log(`✔ 정답을 맞히셨습니다!`);
    } else if (strike === 0 && ball === 0) {
        console.log(`✔ 도전 결과 : OUT!!\n`)
    } else {
        console.log(`✔ 도전 결과 : ${strike}S ${ball}B\n`);
    }
}

async function askNewGame() {
    while(true) {
        const userInput : string = await question("----------게임 종료----------\n* 새로운 게임을 진행하시겠습니까?\n* Yes or No 를 입력해 주세요 : ");
        if (userInput.toLowerCase() === "yes") {
            return true;
        } else if (userInput.toLowerCase() === "no") {
            return false;
        } 
        console.log("* 올바른 값을 입력해 주세요!\n");
    }
}

export {
    baseballGame,
    askNewGame,
    finishGame,
}