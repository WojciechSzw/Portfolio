"use strict";
let pageActual = 0;
const pagesCount = 3;
let wheeling = false;
const mainContainer = document.getElementById("main");
const navbarLink = document.getElementsByClassName("navbar-link");
window.addEventListener("wheel", ScrollFullPage);
function ScrollFullPage(event) {
    var _a, _b;
    if (!wheeling) {
        deleteNavbarChosen(); //deleting every underline under navbar-link
        if (event.deltaY > 0 && pageActual < pagesCount - 1) {
            wheeling = true;
            navbarLink[pageActual + 1].classList.add("navbar-chosen"); //adding underline
            (_a = mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.children[pageActual + 1]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                behavior: "smooth",
            }); //going to another page
            pageActual++;
            window.setTimeout(() => (wheeling = false), 800); //sec break from scrolling
        }
        else if (event.deltaY < 0 && pageActual > 0) {
            wheeling = true;
            navbarLink[pageActual - 1].classList.add("navbar-chosen"); //adding underline
            (_b = mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.children[pageActual - 1]) === null || _b === void 0 ? void 0 : _b.scrollIntoView({
                behavior: "smooth",
            }); //going to another page
            pageActual--;
            window.setTimeout(() => (wheeling = false), 800); //sec break from scrolling
        }
        console.log(pageActual);
    }
}
function goTo(pageName) {
    var _a, _b, _c;
    deleteNavbarChosen();
    switch (pageName) {
        case "about":
            navbarLink[0].classList.add("navbar-chosen");
            (_a = mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.children[0]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
            pageActual = 0;
            break;
        case "projects":
            navbarLink[1].classList.add("navbar-chosen");
            (_b = mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.children[1]) === null || _b === void 0 ? void 0 : _b.scrollIntoView({ behavior: "smooth" });
            pageActual = 1;
            break;
        case "contact":
            navbarLink[2].classList.add("navbar-chosen");
            (_c = mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.children[2]) === null || _c === void 0 ? void 0 : _c.scrollIntoView({ behavior: "smooth" });
            pageActual = 2;
            break;
        default:
    }
}
//deletes navbar-chosen class (underline) from every element
function deleteNavbarChosen() {
    for (let x = 0; x < document.getElementsByClassName("navbar-link").length; x++) {
        document
            .getElementsByClassName("navbar-link")[x].classList.remove("navbar-chosen");
    }
}
