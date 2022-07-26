import {
    getItems,
    getItem,
    addItem,
    removeItem,
    updateItem
} from "/lib/items.js";

window.cartClose = function() {
    document.querySelector("section.cart").classList.remove("open");
    document.getElementById("encap").classList.remove("blur");
};

window.cartOpen = function() {
    document.querySelector("section.cart").classList.add("open");
    document.getElementById("encap").classList.add("blur");
}

window.itemX = function(item) {
    // TODO - remove the item from the cart
}

window.cartMinus = function(item) {

    // TODO - decrease the quantity of the item in the cart
}

window.cartPlus = function(item) {
    // TODO - increase the quantity of the item in the cart
}

