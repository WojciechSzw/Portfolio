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
        timeoutID = window.setTimeout(() => (wheeling = false), 1000);
    }
    // if (timeoutID === -1) {
    //   console.log("timer");
    //   timeoutID = window.setTimeout(() => (wheeling = false), 400);
    // } //if someone started scrolling to other page
    // else if (TouchpadFix < 170) {
    //   TouchpadFix++;
    //   console.log("timer 50");
    //   clearTimeout(timeoutID);
    //   timeoutID = window.setTimeout(() => (wheeling = false), 60);
    // } //if someone is still scrolling, the timer resets
}
function goTo(pageName) {
    var _a;
    deleteNavbarChosen();
    navbarLink[pageName].classList.add("navbar-chosen");
    (_a = mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.children[pageName]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    pageActual = pageName;
    console.log(pageActual);
}
//deletes navbar-chosen class (underline) from every element
function deleteNavbarChosen() {
    for (let x = 0; x < document.getElementsByClassName("navbar-link").length; x++) {
        document
            .getElementsByClassName("navbar-link")[x].classList.remove("navbar-chosen");
    }
}
function goToPage(page) {
    window.location = page;
}
window.onload = (a) => {
    goTo(0);
    const parents = document.getElementsByClassName("project-scroll-item-title");
    Array.from(parents).forEach((div) => {
        const title = div.children[0];
        const wholeText = title.innerHTML;
        Array.from(wholeText).forEach((letter) => {
            if (letter !== " ") {
                div.insertAdjacentHTML("beforeend", "<h3>" + letter + "</h3>");
            }
            else {
                div.insertAdjacentHTML("beforeend", "<h3>" + " " + "</h3>");
                div.insertAdjacentHTML("beforeend", "<h3>" + " " + "</h3>");
                div.insertAdjacentHTML("beforeend", "<h3>" + " " + "</h3>");
            }
        });
        title.remove();
    });
};
