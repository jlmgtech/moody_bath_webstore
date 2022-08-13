window.addQty = () => {
    window.item.qty++;
    updateQty();
};

window.subQty = () => {
    window.item.qty = window.item.qty > 1 ? window.item.qty - 1 : 1;
    updateQty();
};

window.itemAddToCart = () => {
    plug("cart", "add", window.item.name, window.item.qty);
    window.item.qty = 1;
    updateQty();
};

function updateQty() {
    document.getElementById('item-qty-number').innerHTML = window.item.qty;
}
