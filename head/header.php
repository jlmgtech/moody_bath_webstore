<!-- TODO: Search bar -->
<!-- TODO: Cart link -->
<section class="header">
    <style><?php require __DIR__ . "/" . "style.css"; ?></style>
    <script><?php require __DIR__ . "/" . "script.js"; ?></script>
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
                    <li><a href="/cart.php">Cart</a></li>
                    <li>
                        <svg viewBox="0 -115 600 600" width="15" height="15">
                                <path
                                    fill="white"
                                    d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796   s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z    M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z" />
                        </svg>
                        &nbsp;
                        <svg width="15" height="15" viewBox="0 -20 275 275">
                            <path
                                fill="white"
                                stroke-width="10"
                                stroke="white"
                                d="M20.152,60.958L0.05,229.833c-0.242,2.035,0.397,4.07,1.76,5.601c1.363,1.531,3.312,2.408,5.362,2.408h224.449 c2.049,0,4-0.877,5.362-2.408c1.363-1.53,1.998-3.575,1.76-5.601L218.638,60.958c-0.425-3.605-3.486-6.324-7.117-6.324h-32.138 C175.818,24.449,150.116,0.95,118.989,0.95S62.16,24.454,58.594,54.634H27.278C23.636,54.634,20.579,57.352,20.152,60.958z M118.984,15.288c23.207,0,42.44,17.098,45.908,39.346H73.076C76.542,32.386,95.777,15.288,118.984,15.288z M65.296,68.971 h107.371h32.482l18.393,154.534H15.24L33.635,68.971H65.296z" />
    </svg>
                    </li>
                    <li class="x" onclick="navtoggle()">X</li>
                </ul>
                <div id="menu" onclick="navtoggle()">=</div>
            </div>
        </nav>
    </div>
</section>
