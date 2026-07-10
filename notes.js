const createButton = document.querySelector("#notes-create");
const headingInput = document.querySelector("#notes-text-heading");
const contentInput = document.querySelector("#notes-text-content");
const finishButton = document.querySelector("#notes-finish");

const notesMainHeading = document.querySelector("#notes-main-heading");
const notesMainContainer = document.querySelector("#notes-main-container");

let notes = localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [];

class Note {
    constructor(caption, content) {
        this.caption = caption;
        this.content = content;
    }
}

function hideCreate() {
    headingInput.value = "";
    contentInput.value = "";
    headingInput.hidden = "true";
    contentInput.hidden = "true";
    finishButton.hidden = "true";
}

function showCreate() {
    headingInput.removeAttribute("hidden");
    contentInput.removeAttribute("hidden");
    finishButton.removeAttribute("hidden");
}

function renderNotes() {
    if (notes.length > 0) {
        for (const note of notes) {
            renderNote(note);
        }
    }
}

function renderNote(note) {
    const editorContainer = document.createElement("div");
    editorContainer.classList.add("note-editor-container");
    editorContainer.classList.add("hidden");
    const headingEditor = document.createElement("textarea");
    headingEditor.classList.add("notes-text");
    const paragraphEditor = document.createElement("textarea");
    paragraphEditor.classList.add("notes-text");

    const noteContainer = document.createElement("div");
    noteContainer.className = "note-container";
    const noteHeadingContainer = document.createElement("div");
    noteHeadingContainer.className = "note-heading-container";
    const noteHeading = document.createElement("h3");
    noteHeading.className = "note-heading";
    noteHeading.textContent = note.caption;
    const noteButtonContainer = document.createElement("nav");
    noteButtonContainer.className = "note-button-container";
    const noteEditButton = document.createElement("button");
    noteEditButton.className = "note-button";
    noteEditButton.id = "edit";
    noteEditButton.innerHTML = "&#128221;";
    const noteDeleteButton = document.createElement("button");
    noteDeleteButton.className = "note-button";
    noteDeleteButton.innerHTML = "&#10060;";
    const noteParagraph = document.createElement("p");
    noteParagraph.className = "note-paragraph";
    noteParagraph.textContent = note.content;

    editorContainer.append(headingEditor);
    editorContainer.append(paragraphEditor);
    noteHeadingContainer.prepend(editorContainer);

    noteHeadingContainer.append(noteHeading);

    noteButtonContainer.append(noteEditButton);
    noteButtonContainer.append(noteDeleteButton);

    noteHeadingContainer.append(noteButtonContainer);

    noteContainer.append(noteHeadingContainer);
    noteContainer.append(noteParagraph);

    notesMainContainer.prepend(noteContainer);
    notesMainContainer.prepend(notesMainHeading);

    noteDeleteButton.addEventListener("click", () => {
        notes.splice(notes.indexOf(note), 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        noteContainer.remove();
    });

    noteEditButton.addEventListener("click", (event) => {
        if (event.currentTarget.id === "edit") {
            event.currentTarget.id = "finish";
            event.currentTarget.innerHTML = "&#9989";

            headingEditor.innerHTML = note.caption;
            paragraphEditor.innerHTML = note.content;

            editorContainer.classList.remove("hidden");

            noteHeading.classList.add("hidden");
            noteParagraph.classList.add("hidden");
        } else if (event.currentTarget.id === "finish") {
            event.currentTarget.id = "edit";
            event.currentTarget.innerHTML = "&#128221;";
            note.caption = headingEditor.value;
            note.content = paragraphEditor.value;

            noteHeading.innerHTML = note.caption;
            noteParagraph.innerHTML = note.content;

            editorContainer.classList.add("hidden");

            noteHeading.classList.remove("hidden");
            noteParagraph.classList.remove("hidden");

            localStorage.setItem("notes", JSON.stringify(notes));
        }
    });
}

renderNotes();

createButton.addEventListener("click", () => {
    showCreate();
});

finishButton.addEventListener("click", () => {
    if (headingInput.value && contentInput.value) {
        const finishedNote = new Note(headingInput.value, contentInput.value);
        notes.push(finishedNote);
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNote(finishedNote);
    }
    hideCreate();
});
