<section class="store">
    <style><?php require __DIR__ . "/" . "styles.css"; ?></style>
    <script><?php require __DIR__ . "/" . "script.js"; ?></script>

    <h2 class="category-name">BATH COLLECTION</h2>

    <ul class="items">


    <?php
    $items = json_decode(file_get_contents(__DIR__ . "/" . "../public/data/inventory.json"), true);
    foreach ($items as $item) {
    ?>

        <li class="item">
            <div class="item-image">
                <img src="<?php echo $item["image"];?>" alt="" />
            </div>
            <div class="item-info">
                <h3><?php echo $item["name"];?></h3>
                <p class="description"><?php echo $item["description"];?></p>
                <p class="price"><i>$</i><?php printf('%01.2f', $item["price"]);?></p>
                <div>
                <a href="<?php printf("/item.php?item=%s", $item["slug"]); ?>" class="shop-btn">SHOP NOW</a>
                </div>
            </div>
        </li>

    <?php } ?>

</section>
