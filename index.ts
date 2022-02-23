import { pizzaOrder, finishOrder } from './pizzaOrder';
import { Menu, makeNameMap, makeProductCodeMap } from './makeMenu';

async function mainOrder() {
    const mapMenuName : Map<string, Menu> = makeNameMap(); 
    const mapMenuProductCode : Map<number, Menu> = makeProductCodeMap();

    await pizzaOrder(mapMenuName, mapMenuProductCode);
    finishOrder();
}

mainOrder();