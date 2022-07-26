function navtoggle() {
    document.querySelector("nav ul").classList.toggle("hidden");
}

window.addToMenu = (render) => {
	document.getElementById("nav-dyn").innerHTML += render() + "&nbsp;";
};
