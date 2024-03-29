<?php require_once __DIR__ . "/" . "../../../../main.php";
set_error_handler(
    function($errno, $errstr, $errfile, $errline) {
        global $_caughtError;
        $_caughtError = true;
        throw new \ErrorException($errstr, $errno, 1, $errfile, $errline);
    }
);
register_shutdown_function(function() {
    if ($error = error_get_last()) {
        echo "<pre>Fatal error: {$error['message']} in {$error['file']} on line {$error['line']}</pre>";
    }
});

$modules = [
    "Auth"          => "TestAuth",
    "AutoRouter"    => "AutoRouter",
    "Router"        => "Router",
    "Utils"         => "Utils",
    "AppMenu"       => "AppMenu",
    "Logger"        => "ConsoleLogger",
    "Website"       => "MoodyBathWeb",
];
$mdir = __DIR__ . "/" . "../../../../modules/";
$loader = new ModuleLoader($modules, $mdir);
Router::render();
