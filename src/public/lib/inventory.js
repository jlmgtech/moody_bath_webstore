// TODO - this should be only for inventory
// TODO - the cart item functions should be in the cart plugin

export function getInventory() {
    return JSON.parse(localStorage.getItem("inventory"));
}

export function getInventoryItem(name) {
    return JSON.parse(localStorage.getItem("inventory")).find(item => item.name === name);
}
