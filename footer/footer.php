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
            <li><a href="/">HOME</a></li>
            <li><a href="/about.php">ABOUT</a></li>
            <li><a href="/">STORE</a></li>
            <li><a href="/contact.php">CONTACT</a></li>
        </ul>

        <br><br>

        <div class="email-subscribe">
            <input type="email" placeholder="Email Address" />
            <button>SUBSCRIBE</button> <!-- TODO - add onclick -->
        </div>

        <br><br>

        <div class="copyright">
            <p>&copy; <?php echo date("Y"); ?> Moody Bath Co. All rights reserved.</p>
            <a href="/policies.php">Terms and Conditions</a>
            <a href="/policies.php/#privacy">Privacy Policy</a>             <!-- TODO -->
            <a href="/policies.php/#cookies">Cookie Policy</a>               <!-- TODO -->
            <a href="/sitemap.xml">Site Map</a>                             <!-- TODO -->
            <a href="/accessibility.php/#accessibility">Accessibility</a>   <!-- TODO -->
        </div>

    </div>

</section>
