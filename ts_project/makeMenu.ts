class Menu {
    name : string;
    productCode : number;
    price : number;

    constructor(name : string, productCode : number, price : number) {
        this.name = name;
        this.productCode = productCode;
        this.price = price;
    }
}

const menus : Menu[] = [new Menu("갈릭버터쉬림프", 10001, 29900),
                    new Menu("수퍼슈프림", 10002, 28900),
                    new Menu("스파이시불고기", 10003, 22500),
                    new Menu("호박고구마", 10004, 22500),
                    new Menu("페페로니", 10005, 16900),
                    new Menu("콜라", 10006, 1500),
                    new Menu("사이다", 10007, 1000),
                    new Menu("환타", 10008, 2000)];

function makeNameMap() {
    const mapMenuName = new Map<string, [number, number]>();

    menus.forEach((food) => {
        mapMenuName.set(food.name, [food.productCode, food.price]);
    });

    return mapMenuName;
}

function makeProductCodeMap() {
    const mapMenuProductCode = new Map<number, [string, number]>();

    menus.forEach((food) => {
        mapMenuProductCode.set(food.productCode, [food.name, food.price]);
    });

    return mapMenuProductCode;
}

export {
    makeNameMap,
    makeProductCodeMap
}