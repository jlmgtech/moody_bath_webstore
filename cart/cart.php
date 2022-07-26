<style><?php require_once __DIR__ . "/" . "styles.css";?></style>
<script type="module"><?php require_once __DIR__ . "/" . "script.js";?></script>
<section class="cart">
    <!-- TODO: show all items and do the checkout process here -->
    <h1>Shopping Cart - 3 items <span class="X" onclick="cartClose()">X</span></h1>
    <div id="cart-container">

        <ul>

            <li>
                <div class="image" style="background-image: url('https://via.placeholder.com/480x320');"></div>
                <div class="info">
                    <h2>
                        Clarity
                        <i class="X" onclick="itemX(itemid)">X</i>
                    </h2>
                    <div class="price">$15.98</div>
                    <div class="quantity">
                        <button onclick="cartMinus(itemid)">-</button>
                        <span>1</span>
                        <button onclick="cartPlus(itemid)">+</button>
                    </div>
                </div>
            </li>

            <li>
                <div class="image" style="background-image: url('https://via.placeholder.com/480x320');"></div>
                <div class="info">
                    <h2>
                        Clarity
                        <i class="X" onclick="itemX(itemid)">X</i>
                    </h2>
                    <div class="price">$15.98</div>
                    <div class="quantity">
                        <button onclick="cartMinus(itemid)">-</button>
                        <span>1</span>
                        <button onclick="cartPlus(itemid)">+</button>
                    </div>
                </div>
            </li>

            <li>
                <div class="image" style="background-image: url('https://via.placeholder.com/480x320');"></div>
                <div class="info">
                    <h2>
                        Clarity
                        <i class="X" onclick="itemX(itemid)">X</i>
                    </h2>
                    <div class="price">$15.98</div>
                    <div class="quantity">
                        <button onclick="cartMinus(itemid)">-</button>
                        <span>1</span>
                        <button onclick="cartPlus(itemid)">+</button>
                    </div>
                </div>
            </li>

        </ul>

        <div id="cart-total">
            <div><div>Subtotal</div>          <div>$15.98</div></div>
            <div><div>Standard Shipping</div> <div>FREE</div></div>
            <div><div>Total</div>             <div>$15.98</div></div>
        </div>

        <button id="checkout-btn">Checkout</button>

    </div>
</section>
