const nav = document.querySelector("#sidebar-nav");
const placeholder = document.querySelector("#placeholder");
const lastSelected = localStorage.getItem("lastSelected");

function loadContent(id) {
    hideAll();
    switch (id) {
        case "notes":
            document
                .querySelector("#notes-container")
                .classList.remove("hidden");
            break;
        // future values can now be added for every button individually
    }
}

function hideAll() {
    const children = document.querySelector("#content-container").children;

    for (const child of children) {
        child.classList.add("hidden");
    }
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
            hideAll();
            document.querySelector("#placeholder").classList.remove("hidden");
        }
        for (const button of document.querySelectorAll(".nav-button")) {
            button.classList.remove("selected");
        }
        if (!clickedHasSelected) {
            event.target.classList.add("selected");
            placeholder.classList.add("hidden");
            localStorage.setItem("lastSelected", event.target.id);
            loadContent(event.target.id);
        }
    }
});
