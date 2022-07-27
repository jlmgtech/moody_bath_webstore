// TODO - this should be only for inventory
// TODO - the cart item functions should be in the cart plugin

export function getCart() {
    const cart = localStorage.getItem("cart");
    if (cart === null) {
        localStorage.setItem("cart", "[]");
        return [];
    } else {
        return JSON.parse(cart);
    }
}

export function getCartItem(name) {
    return getCart().find(item => item.name === name);
}

export function addCartItem(item, qty) {
    if (qty === undefined) qty = 1;
    let cart = getCart();
    let old = cart.find(i => i.name === item.name);
    if (old) {
        old.qty++;
    } else {
        item.qty = qty;
        cart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function subtractCartItem(name) {
    let cart = getCart();
    let item = cart.find(i => i.name === name);
    if (!item) return;
    if (item.qty > 1) {
        item.qty--;
        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        removeCartItem(name);
    }
}

export function removeCartItem(name) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateCartItem(name, qty) {
    qty = qty | 0;
    if (qty === 0) {
        removeCartItem(name);
        return;
    }
    let cart = getCart();
    let item = cart.find(item => item.name === name);
    if (item) {
        item.qty = qty;
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}
