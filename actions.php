<?php


function script_response(string $file) {
    return function() use ($file) {
        include __DIR__ . "/" . $file;
    };
}

Actions::on("routes", function() {
    AutoRouter::set("index", function() {
        include __DIR__ . "/" . "public/public/index.php";
    });
    AutoRouter::set("item", script_response("public/public/item.php"));
    AutoRouter::set("about", script_response("public/public/about.php"));
    AutoRouter::set("contact", script_response("public/public/contact.php"));
    AutoRouter::set("policies", script_response("public/public/policies.php"));
    AutoRouter::set("accessibility", script_response("public/public/accessibility.php"));
    Router::assets("lib", __DIR__ . "/" . "public/public/lib/");
    Router::assets("images", __DIR__ . "/" . "public/public/images/");
    Router::get("/", function() {
        AutoRouter::go(Router::current_module(), "index");
    });
    Router::assets("/", __DIR__ . "/public");
});

Actions::on("menu", function() {
    AppMenu::add("dot-circle");
});
