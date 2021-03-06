import {
    getCart,
    getCartItem,
    addCartItem,
    removeCartItem,
    updateCartItem,
    subtractCartItem,
} from "/lib/cart.js";
import {
    getInventory,
    getInventoryItem,
} from "/lib/inventory.js";

import {register, plug} from "/lib/plugs.js";

const u = fn => (...args) => {
    fn(...args);
    cart.update();
};
const i = fn => (name, ...args) => {
    const item = getInventoryItem(name);
    if (item) fn(item, ...args);
    else console.error("item not found, callback ignored");
};
const currency = value => {
    return value.toFixed(2);
};

const cart = {};
cart.update = () => {
    const items = getCart();
    let output = "";
    if (items.length === 0) {
        output = "<p>Your cart is empty</p>";
        document.getElementById("checkout-btn").style.display = "none";
    } else {
        document.getElementById("checkout-btn").style.display = "block";
        for (const item of items) {
            output += `
                <li>
                    <div class="image" style="background-image: url('${item.image}'), url('https://via.placeholder.com/480x320');"></div>
                    <div class="info">
                        <h2>
                            ${item.name}
                            <i class="X" onclick="plug('cart','itemX','${item.name}')">X</i>
                        </h2>
                        <div class="price">${currency(item.price * item.qty)}</div>
                        <div class="quantity">
                            <button onclick="plug('cart','minus','${item.name}')">-</button>
                            <span>${item.qty}</span>
                            <button onclick="plug('cart','plus','${item.name}')">+</button>
                        </div>
                    </div>
                </li>
            `;
        }
    }
    document.getElementById("item-list").innerHTML = output;

    // TODO - now update totals
    const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    document.getElementById("cart-total").innerHTML = `
        <div><div>Subtotal</div>            <div>$${currency(subtotal)}</div></div>
        <div><div>Standard Shipping</div>   <div>FREE</div></div>
        <div><div>Tax</div>                 <div>$${currency(tax)}</div></div>
        <div><div>Total</div>               <div>$${currency(total)}</div></div>
    `;

    const nitems = cart.numItems();
    const nitem_el = document.getElementById("nitems");
    if (nitem_el) {
        nitem_el.innerHTML = nitems;
        if (items.length > 0) {
            document.getElementById("nitems").classList.remove("hidden");
        } else {
            document.getElementById("nitems").classList.add("hidden");
        }
    }
    const cart_nitems = document.getElementById("cart-nitems");
    if (cart_nitems) {
        cart_nitems.innerHTML = nitems + " items";
    }
};

cart.numItems = () => {
    let qty = 0;
    for (const item of cart.items()) {
        qty += item.qty;
    }
    return qty;
};

cart.close = e => {
    document.querySelector("section.cart").classList.remove("open");
    document.getElementById("encap").classList.remove("blur");
};
cart.open = u(e => {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    document.getElementById("encap").classList.add("blur");
    document.querySelector("section.cart").classList.add("open");
});
cart.items = () => getCart();
cart.itemX = i(u(item => removeCartItem(item.name)));
cart.minus = i(u(item => subtractCartItem(item.name)));
cart.plus  = i(u(item => addCartItem(item)));
cart.add = i(u(async (item, qty) => {
    console.log("qty recvd: ", qty);
    qty = qty || 1;
    addCartItem(item, qty);
    // run open AFTER the cart update
    setTimeout(cart.open);
    console.log("we're here");
}));
cart.buynow = i(u(async item => {
    // TODO - buy now
    // add to cart and go straight to checkout page
    console.warn("TODO - BUY NOW");
}));

cart.checkout = () => {
    console.warn("TODO - CHECKOUT PAGE");
};

const cartNavIcon = (nitems) => `
        <div id='cart-icon' class='nav-icon' onclick='plug("cart","open",event)'>
            <svg width="15" height="15" viewBox="0 -20 275 275">
                <path
                    fill="white"
                    stroke-width="10"
                    stroke="white"
                    d="M20.152,60.958L0.05,229.833c-0.242,2.035,0.397,4.07,1.76,5.601c1.363,1.531,3.312,2.408,5.362,2.408h224.449 c2.049,0,4-0.877,5.362-2.408c1.363-1.53,1.998-3.575,1.76-5.601L218.638,60.958c-0.425-3.605-3.486-6.324-7.117-6.324h-32.138 C175.818,24.449,150.116,0.95,118.989,0.95S62.16,24.454,58.594,54.634H27.278C23.636,54.634,20.579,57.352,20.152,60.958z M118.984,15.288c23.207,0,42.44,17.098,45.908,39.346H73.076C76.542,32.386,95.777,15.288,118.984,15.288z M65.296,68.971 h107.371h32.482l18.393,154.534H15.24L33.635,68.971H65.296z" />
            </svg>
            <span id='nitems' class="${nitems?'':'hidden'}">${nitems}</span>
        </div>
`;

cart.init = async () => {
    // do this with a plugin!
    document.getElementById("encap").onclick = () => plug("cart", "close");
    await plug("cart", "update");
    // now update the cart icon
    plug("nav", "add", "cart", cartNavIcon(cart.numItems()));
};
register("cart", cart);
