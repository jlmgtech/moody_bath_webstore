<?php

Actions::on("routes", function() {
    AutoRouter::set("index", "/", function() {
        include __DIR__ . "/" . "views/index.php";
    });
    Router::get("/", function() {
        include __DIR__ . "/" . "public/public/index.php";
    });

    Router::assets("/", __DIR__ . "/public");
});

Actions::on("menu", function() {
    AppMenu::add_to_menu(
        Actions::current_driver(),
        "/",
        //AutoRouter::get(Actions::current_module(), "index"),
        "dot-circle"
    );
});
