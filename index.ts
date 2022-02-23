import { pizzaOrder, finishOrder } from './ts_project/pizzaOrder';
import { makeNameMap, makeProductCodeMap } from './ts_project/makeMenu';

async function mainOrder() {
    const mapMenuName : Map<string, [number, number]> = makeNameMap(); 
    const mapMenuProductCode : Map<number, [string, number]> = makeProductCodeMap();

    await pizzaOrder(mapMenuName, mapMenuProductCode);
    finishOrder();
}

mainOrder();