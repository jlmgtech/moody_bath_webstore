<section class="footer">

    <style><?php require __DIR__ . "/" . "styles.css"; ?></style>
    <script><?php require __DIR__ . "/" . "script.js"; ?></script>

    <div class="container">
        <div class="footer-title">
            <a href="/" class="logo">
                MOODY BATH CO.
            </a>
        </div>

        <ul class="footer-nav">
            <li><a href="<?= AutoRouter::get("Website", "index") ?>">HOME</a></li>
            <li><a href="<?= AutoRouter::get("Website", "about") ?>">ABOUT</a></li>
            <li><a href="<?= AutoRouter::get("Website", "index") ?>">STORE</a></li>
            <li><a href="<?= AutoRouter::get("Website", "contact") ?>">CONTACT</a></li>
        </ul>

        <br><br>

        <div class="email-subscribe">
            <input type="email" placeholder="Email Address" />
            <button>SUBSCRIBE</button> <!-- TODO - add onclick -->
        </div>

        <br><br>

        <div class="copyright">
            <p>&copy; <?php echo date("Y"); ?> Moody Bath Co. All rights reserved.</p>
            <a href="<?= AutoRouter::get("Website", "policies") ?>">Terms and Conditions</a>
            <a href="<?= AutoRouter::get("Website", "policies") ?>#privacy">Privacy Policy</a>
            <a href="<?= AutoRouter::get("Website", "policies") ?>#cookies">Cookie Policy</a>
            <a href="/sitemap.xml">Site Map</a>
            <a href="<?= AutoRouter::get("Website", "accessibility") ?>">Accessibility</a> 
            <a href="<?= AutoRouter::get("AppMenu", "index") ?>">Admin</a>
        </div>

    </div>

</section>
