import * as readline from "readline";
import * as utils from "util";
import { Menu } from './makeMenu';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = utils.promisify(rl.question).bind(rl);

function finishOrder() {
    rl.close();
}

async function pizzaOrder(mapMenuName : Map<string, Menu>, mapMenuProductCode : Map<number, Menu>) {
    printMenu(mapMenuProductCode);
    const userOrderMenus : any[] = [];

    console.log("\n['Done'을 입력할 때까지 주문을 받습니다.\n메뉴(이름 혹은 상품 코드)를 입력해 주세요.]");

    while(true) {
        const userInput : any = await question("* : ");
        
        if (mapMenuName.has(userInput)) {
            userOrderMenus.push(mapMenuName.get(userInput));
        } else if (mapMenuProductCode.has(parseInt(userInput))) {
            userOrderMenus.push(mapMenuProductCode.get(parseInt(userInput)));
        } else if (checkDone(userInput)) {
            confirmAnOrder(userOrderMenus);
            console.log("[주문을 종료합니다.]\n");
            break;
        } else {
            inputGuidePrint(userInput);
        }
    }
}

function confirmAnOrder(userOrderMenus : Menu[]) {
    console.log("\n[주문을 확인합니다.]");

    let totalPrice: number = 0;
    userOrderMenus.forEach((orderMenu) => {
        console.log(`* ${orderMenu.name}(${orderMenu.productCode}) : ${orderMenu.price}원`);
        totalPrice += orderMenu.price;
    });
    
    console.log(`\n => 총 금액 : ${totalPrice}원`);
}

function printMenu(mapMenuProductCode : Map<number, Menu>) {
    console.log("---------- Menu ----------");

    mapMenuProductCode.forEach((value) => {
        console.log(`* ${value.name}(${value.productCode}) : ${value.price}원`);
    });
}

function checkDone(userInput : string) {
    return userInput.toLowerCase() === 'done';
}

function inputGuidePrint(userInput : string) {
    console.log(`! ${userInput}은 없는 메뉴입니다. 올바른 메뉴를 입력하셨는지 확인해 주세요 !`);
    console.log("* 메뉴는 상품명과 상품 코드를 통해 입력받습니다.");
    console.log("* 메뉴 사이에는 엔터(개행)를 입력해 주세요.");
    console.log("* 'Done'을 입력 시 주문을 종료합니다.\n");
}

export {
    pizzaOrder,
    finishOrder
}