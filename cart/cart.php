<style><?php require_once __DIR__ . "/" . "styles.css";?></style>
<script type="module"><?php require_once __DIR__ . "/" . "script.js";?></script>
<section class="cart">
    <!-- TODO: show all items and do the checkout process here -->
    <h1>
        <span class="cart-title">
            Shopping Cart 
            <i id="cart-nitems"></i>
        </span>
        <span class="X" onclick='plug("cart", "close")'>
            X
        </span>
    </h1>

    <div id="cart-container">

        <ul id="item-list"></ul>

        <div id="cart-total">
            <div><div>Subtotal</div>          <div>$15.98</div></div>
            <div><div>Standard Shipping</div> <div>FREE</div></div>
            <div><div>Total</div>             <div>$15.98</div></div>
        </div>

        <button id="checkout-btn">Checkout</button>

    </div>
</section>
