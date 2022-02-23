const readline = require('readline');
const utils = require("util");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = utils.promisify(rl.question).bind(rl);

function finish() {
    rl.close();
}

async function game() {
    // 게임을 생성한다
    GameTitlePrint();
    const answerNumberArray = MakeAnswerNumber();

    // 루프 시작
    while(true) {
        // 숫자 입력을 받는다
        const userInput = await question("* 숫자를 입력 하세요 : ");
        // 판정 및 게임을 더 할 것인지 질문
        if (userInput == 'give up') {
            // 게임 포기
            console.log(`정답 : ${answerNumberArray}\n`);
            break;
        } else {
            // 입력을 숫자 3개로 만든다
            const srcNumberStrings = userInput.split(' '); 

            if (!CheckInputFormat(srcNumberStrings)) {
                // 입력 오류
                InputGuidePrint();
            } else {
                const numbers = srcNumberStrings.map((src) => Number(src)); // 숫자로 바꾼다

                const [strikeCount, ballCount] = CompareUserNumber(answerNumberArray, numbers);

                PrintCompareResult(strikeCount, ballCount);

                // 스트라이크 볼 카운트를 출력한다
                if (checkWin(strikeCount, ballCount)) {
                    break;
                }
            }
        }
    }
    // 게임종료
}

//UserNewGame = AskNewGame();

function GameTitlePrint() {
    console.log("\n----------------숫자 야구 게임----------------");
    console.log("* 사용되는 숫자는 0 ~ 9의 서로 다른 숫자입니다.");
    console.log("* 숫자는 맞지만 위치가 틀렸을 때는 볼");
    console.log("* 숫자와 위치가 전부 맞으면 스트라이크");
    console.log("* 숫자와 위치가 전부 틀리면 아웃\n");
    
    console.log("-------새 게임을 시작합니다!-------");
}

function MakeAnswerNumber() {
    const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const answerNumberArray = [];

    for (let i = 0; i <3; i++) {
        const pickNum = Math.floor(Math.random() * number.length);
        answerNumberArray.push(number[pickNum]);
        number.splice(pickNum, 1);
    }

    return answerNumberArray;
}

function CheckInputFormat(userArr) {
    let checkInputForm = true;

    if (userArr.length != 3) {
        checkInputForm = false;
    } else {
        for (let i = 0; i < 3; i++) {
            if (userArr[i].length !== 1 || !isNumeric(userArr[i])) {
                checkInputForm = false;
            } else if (i !== 0 && userArr[i - 1] === userArr[i]) {
                checkInputForm = false;
            }
        }
    }

    return checkInputForm;
}

function InputGuidePrint() {
    console.log("---------------------입력 안내--------------------------")
    console.log("* 입력은 공백을 구분으로 세 개의 숫자를 입력받습니다.");
    console.log("* 숫자는 0부터 9 사이의 양의 자연수입니다.");
    console.log("* 중복 입력은 허용하지 않습니다. ex) 1 1 2 => 1의 중복 입력");
    console.log("* 'give up'을 입력 시에 게임을 포기하는 것으로 간주하고 답을 출력합니다.\n");

    console.log("> 옳은 값으로 다시 입력해 주세요.")
}

function CompareUserNumber(answerArr, userArr) {
    let strike = 0;
    let ball = 0;

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

function checkWin(strikeCount, ballCount) {
    return strikeCount === 3;
}

function isNumeric(val) {
    return /^-?\d+$/.test(val);
}

function PrintCompareResult(strike, ball) {
    if (strike == 3) {
        console.log(`✔ 정답을 맞히셨습니다!`);
    } else if (strike == 0 && ball == 0) {
        console.log(`✔ 도전 결과 : OUT!!\n`)
    } else {
        console.log(`✔ 도전 결과 : ${strike}S ${ball}B\n`);
    }
}

async function AskNewGame() {
    while(true) {
        const userInput = await question("----------게임 종료----------\n* 새로운 게임을 진행하시겠습니까?\n* Yes or No 를 입력해 주세요 : ");
        if (userInput.toLowerCase() === "yes") {
            return true;
        } else if (userInput.toLowerCase() === "no") {
            return false;
        } 
        
        console.log("* 올바른 값을 입력해 주세요!\n");
    }
}

module.exports = {
    game,
    AskNewGame,
    finish,
}