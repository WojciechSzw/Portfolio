"use strict";
let pageActual = 0;
const pagesCount = 3;
let wheeling = false;
const mainContainer = document.getElementById("main");
const navbarLink = document.getElementsByClassName("navbar-link");
let timeoutID = -1;
let TouchpadFix = 0;
window.addEventListener("wheel", ScrollFullPage);
function ScrollFullPage(event) {
    if (!wheeling) {
        wheeling = true;
        timeoutID = -1;
        TouchpadFix = 0;
        if (event.deltaY > 0 && pageActual < pagesCount - 1) {
            goTo(pageActual + 1);
        }
        else if (event.deltaY < 0 && pageActual > 0) {
            goTo(pageActual - 1);
        }
    }
    if (timeoutID === -1) {
        console.log("timer");
        timeoutID = window.setTimeout(() => (wheeling = false), 400);
    } //if someone started scrolling to other page
    else if (TouchpadFix < 200) {
        TouchpadFix++;
        console.log("timer 50");
        clearTimeout(timeoutID);
        timeoutID = window.setTimeout(() => (wheeling = false), 400);
    } //if someone is still scrolling, the timer resets
}
function goTo(pageName) {
    var _a, _b, _c;
    deleteNavbarChosen();
    switch (pageName) {
        case 0:
            navbarLink[0].classList.add("navbar-chosen");
            (_a = mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.children[0]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
            pageActual = 0;
            break;
        case 1:
            navbarLink[1].classList.add("navbar-chosen");
            (_b = mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.children[1]) === null || _b === void 0 ? void 0 : _b.scrollIntoView({ behavior: "smooth" });
            pageActual = 1;
            break;
        case 2:
            navbarLink[2].classList.add("navbar-chosen");
            (_c = mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.children[2]) === null || _c === void 0 ? void 0 : _c.scrollIntoView({ behavior: "smooth" });
            pageActual = 2;
            break;
        default:
    }
    console.log(pageActual);
}
//deletes navbar-chosen class (underline) from every element
function deleteNavbarChosen() {
    for (let x = 0; x < document.getElementsByClassName("navbar-link").length; x++) {
        document
            .getElementsByClassName("navbar-link")[x].classList.remove("navbar-chosen");
    }
}
