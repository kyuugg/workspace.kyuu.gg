const nav = document.querySelector("#sidebar-nav");
const placeholder = document.querySelector("#placeholder");
const lastSelected = localStorage.getItem("lastSelected");

function loadContent(id) {
    // coming soon
}

if (lastSelected) {
    placeholder.classList.add("hidden");
    document.getElementById(lastSelected).classList.add("selected");
    loadContent(lastSelected);
}

nav.addEventListener("click", (event) => {
    if (event.target.matches(".nav-button")) {
        let clickedHasSelected = false;
        if (event.target.matches(".selected")) {
            clickedHasSelected = true;
            placeholder.classList.remove("hidden");
            localStorage.removeItem("lastSelected");
        }
        for (const button of document.querySelectorAll(".nav-button")) {
            button.classList.remove("selected");
        }
        if (!clickedHasSelected) {
            event.target.classList.add("selected");
            placeholder.classList.add("hidden");
            loadContent(event.target.id);
            localStorage.setItem("lastSelected", event.target.id);
        }
    }
});
