import {plug, register} from "/lib/plugs.js";

window.navtoggle = () => {
    document.querySelector("nav ul").classList.toggle("hidden");
};

window.register("nav", {

    init() {},

    add(name, render) {
        document.getElementById("nav-dyn").innerHTML += render + "&nbsp;";
    },

});
