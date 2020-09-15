chevron = document.getElementById("nav-chevron");
cross = document.getElementById("nav-cross");

window.addEventListener("beforeunload", function () {
    document.body.classList.add("animate-out");
});

function openNav() {
    document.getElementById("sidebar").style.width = "73px";

    chevron.classList.add("hide-icon");
    cross.classList.remove("hide-icon");
}

function closeNav() {
    chevron = document.getElementById("nav-chevron");
    cross = document.getElementById("nav-cross");

    document.getElementById("sidebar").style.width = "0";
    
    cross.classList.add("hide-icon");
    chevron.classList.remove("hide-icon");
}

window.matchMedia("(min-width: 700px)").addListener(closeNav);