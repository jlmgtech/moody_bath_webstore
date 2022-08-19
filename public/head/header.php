<!-- TODO: Search bar -->
<!-- TODO: Cart link -->
<script type="module">
const inventory = <?php echo file_get_contents(__DIR__ . "/" . "../public/data/inventory.json"); ?>;
for (const item of inventory) {
    item.qty = (Math.random() * 3 + 1) | 0;
}
localStorage.setItem("inventory", JSON.stringify(inventory));
</script>
<section class="header">
    <style><?php require __DIR__ . "/" . "style.css"; ?></style>
    <script type="module"><?php require __DIR__ . "/" . "script.js"; ?></script>
    <div class="topbar">
        <span class="accent">FREE SHIPPING</span> WITH ORDERS &gt; $80
    </div>
    <div class="nav">
        <nav>
            <span class="nav-title">
                <a href="/" class="logo">
                    MOODY BATH CO.
                </a>
            </span>
            <div>
                <ul class="hidden">
                    <li><a href="/">Shop</a></li>
                    <li><a href="/about.php">About</a></li>
                    <li><a href="/contact.php">Contact</a></li>
                    <li id="nav-dyn">
<!--
                        <div class='nav-icon' onclick="searchOpen(event)">
                            <svg viewBox="0 -115 600 600" width="15" height="15">
                                    <path
                                        fill="white"
                                        d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796   s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z    M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z" />
                            </svg>
                        </div>
-->
                        &nbsp;
                    </li>
                    <li class="x" onclick="navtoggle()">X</li>
                </ul>
                <div id="menu" onclick="navtoggle()">=</div>
            </div>
        </nav>
    </div>
</section>
