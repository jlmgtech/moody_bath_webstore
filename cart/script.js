import {
    getItems,
    getItem,
    addItem,
    removeItem,
    updateItem,
} from "/lib/items.js";


const renderCartIcon = () => {
    return `
        <div id='cart-icon' class='nav-icon' onclick="cartOpen(event)">
            <svg width="15" height="15" viewBox="0 -20 275 275">
                <path
                    fill="white"
                    stroke-width="10"
                    stroke="white"
                    d="M20.152,60.958L0.05,229.833c-0.242,2.035,0.397,4.07,1.76,5.601c1.363,1.531,3.312,2.408,5.362,2.408h224.449 c2.049,0,4-0.877,5.362-2.408c1.363-1.53,1.998-3.575,1.76-5.601L218.638,60.958c-0.425-3.605-3.486-6.324-7.117-6.324h-32.138 C175.818,24.449,150.116,0.95,118.989,0.95S62.16,24.454,58.594,54.634H27.278C23.636,54.634,20.579,57.352,20.152,60.958z M118.984,15.288c23.207,0,42.44,17.098,45.908,39.346H73.076C76.542,32.386,95.777,15.288,118.984,15.288z M65.296,68.971 h107.371h32.482l18.393,154.534H15.24L33.635,68.971H65.296z" />
            </svg>
        </div>
    `;
};

//plugin("navAddToMenu", renderCartIcon);

addEventListener("load", () => {
    document.getElementById("encap").onclick = cartClose;
});
const u = fn => (...args) => {
    fn(...args);
    updateCart();
};
const i = fn => name => {
    const item = getItem(name);
    if (item) fn(item);
    else console.error("item not found, callback ignored");
};
const currency = value => {
    return value.toFixed(2);
};
window.updateCart = () => {
    const items = getItems();
    let output = "";
    for (const item of items) {
        output += `
            <li>
                <div class="image" style="background-image: url('${item.image}'), url('https://via.placeholder.com/480x320');"></div>
                <div class="info">
                    <h2>
                        ${item.name}
                        <i class="X" onclick="itemX('${item.name}')">X</i>
                    </h2>
                    <div class="price">$${currency(item.price * item.qty)}</div>
                    <div class="quantity">
                        <button onclick="cartMinus('${item.name}')">-</button>
                        <span>${item.qty}</span>
                        <button onclick="cartPlus('${item.name}')">+</button>
                    </div>
                </div>
            </li>
        `;
    }
    document.getElementById("item-list").innerHTML = output;
};
window.cartClose = e => {
    document.querySelector("section.cart").classList.remove("open");
    document.getElementById("encap").classList.remove("blur");
};
window.cartOpen = u(e => {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector("section.cart").classList.add("open");
    document.getElementById("encap").classList.add("blur");
});
window.itemX = i(u(item => {
    removeItem(item.name)
}));
window.cartMinus = i(u(item => {
    updateItem(item.name, item.qty - 1);
}));
window.cartPlus = i(u(item => {
    updateItem(item.name, item.qty + 1);
}));
