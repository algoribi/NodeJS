import { pizzaOrder, finishOrder } from './pizzaOrder';
import { MenuMap, makeMenu } from './makeMenu';

async function mainOrder() {
    const myRestaurantMenu : MenuMap = makeMenu();
    
    await pizzaOrder(myRestaurantMenu);
    finishOrder();
}

mainOrder();