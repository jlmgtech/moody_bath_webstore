<section class="item">
    <script>window.item = <?php echo json_encode($item); ?>;item.qty=1;</script>
    <style><?php require_once __DIR__ . "/" . "styles.css"; ?></style>
    <script><?php require_once __DIR__ . "/" . "script.js"; ?></script>

    <div class="item-container">

        <div class="img" style="background-image: url('<?php echo $item["image"];?>'), url('https://via.placeholder.com/480x320');"></div>

        <div class="info">
            <small>NEW</small>
            <h1><?php echo $item["name"]; ?></h1>
            <div class="price">
                <span class="old-price">$<?= sprintf("%01.2f", $item["oldprice"]); ?></span>
                <span class="new-price">$<?= sprintf("%01.2f", $item["price"]); ?></span>
            </div>
            <div class="description"><?php echo $item["description"]; ?></div>

            <div class="quantity-title">QUANTITY</div>
            <div class="quantity-box">
                <div class="btn" onclick="addQty()">+</div>
                <div id="item-qty-number">1</div>
                <div class="btn" onclick="subQty()">-</div>
            </div>

            <div class="ctoa add-to-cart"
                 onclick="itemAddToCart()">
                ADD TO CART
            </div>

            <div class="ctoa buy-now"
                 onclick="itemBuyNow()">
                BUY NOW
            </div>

        </div>

    </div>
</section>
