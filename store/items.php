<style>
<?php require __DIR__ . "/" . "styles.css"; ?>
</style>
<script type="text/javascript">
<?php require __DIR__ . "/" . "script.js"; ?>
</script>

<h2 class="category-name">BATH COLLECTION</h2>

<section class="store">


<?php
$items = json_decode(file_get_contents(__DIR__ . "/" . "items.json"), true);
foreach ($items as $item) {
?>

<div class="item">
    <div class="item-image">
        <img src="/store/<?php echo $item["image"];?>" alt="" />
    </div>
    <div class="item-info">
        <h3><?php echo $item["name"];?></h3>
        <p class="description"><?php echo $item["description"];?></p>
        <p class="price"><i>$</i><?php printf('%01.2f', $item["price"]);?></p>
        <div>
            <a href="#" class="shop-btn">SHOP NOW</a>
        </div>
    </div>
</div>

<?php } ?>

</section>
