import * as readline from "readline";
import * as utils from "util";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = utils.promisify(rl.question).bind(rl);

function finishOrder() {
    rl.close();
}

async function pizzaOrder(mapMenuName : Map<string, [number, number]>, mapMenuProductCode : Map<number, [string, number]>) {
    printMenu(mapMenuProductCode);
    const menus : string[] = [];

    console.log("\n['Done'을 입력할 때까지 주문을 받습니다.\n메뉴(이름 혹은 상품 코드)를 입력해 주세요.]");

    while(true) {
        const userInput : any = await question("* : ");
        if (checkDone(userInput)) {
            confirmAnOrder(menus, mapMenuName);
            console.log("* 주문을 종료합니다.");
            break;
        } else if (checkInputTypeString(userInput) && mapMenuName.has(userInput)) {
            menus.push(userInput);
        } else if (mapMenuProductCode.has(parseInt(userInput))) {
            menus.push(userInput);
        } else {
            inputGuidePrint();
        }
    }
}

// 수정 부분 : map에서 어떻게 출력 할 것인지. 또 똑같이 string으로 메뉴 명과 상품 코드를 받는데 이걸 어떻게 구분 할 것인지 생각해야 한다.
function confirmAnOrder(menus : string[], mapMenuName : Map<string, [number, number]>) {
    console.log("[주문을 확인합니다.]")
    menus.forEach((food) => {
        mapMenuName.forEach((value, key) => {
            // if (key === food )
        });
    });
    // 질문!
    /*
    menus.forEach((food) => {
        console.log("* " + food + "(" + mapMenuName.get(food)[0] + ") : " + mapMenuName.get(food)[1] + "원");
    });
    */
}

function printMenu(mapMenuProductCode : Map<number, [string, number]>) {
    console.log("---------- Menu ----------");

    mapMenuProductCode.forEach((value, key) => {
        console.log("* " + value[0] + "(" + key + ") : " + value[1] + "원");
    });
}

function checkDone(userInput : string) {
    return userInput.toLowerCase() === 'done';
}

function checkInputTypeString(target : any) {
    return Object.prototype.toString.call(target).slice(8, -1) === "String";
}

function inputGuidePrint() {
    console.log("! 없는 메뉴입니다. 올바른 메뉴를 입력하셨는지 확인해 주세요 !");
    console.log("* 메뉴는 상품명과 상품 코드를 통해 입력받습니다.");
    console.log("* 메뉴 사이에는 엔터(개행)를 입력해 주세요.");
    console.log("* 'Done'을 입력 시 주문을 종료합니다.");
}

export {
    pizzaOrder,
    finishOrder
}