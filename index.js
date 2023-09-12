"use strict";
var _a;
let pageActual = 0;
let wheeling = false;
const mainContainer = document.getElementById("main");
const navbarLink = document.getElementsByClassName("navbar-link");
const pagesCount = (_a = mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.children.length) !== null && _a !== void 0 ? _a : 0;
let timeoutID = -1;
window.addEventListener("wheel", ScrollFullPage);
function ScrollFullPage(event) {
    if (wheeling || Math.abs(event.deltaY) < 30)
        return;
    wheeling = true;
    timeoutID = -1;
    if (event.deltaY > 0 && pageActual < pagesCount - 1) {
        goTo(pageActual + 1);
    }
    else if (event.deltaY < 0 && pageActual > 0) {
        goTo(pageActual - 1);
    }
    timeoutID = window.setTimeout(() => (wheeling = false), 600);
}
function goTo(pageIndex) {
    var _a;
    deleteNavbarChosen();
    navbarLink[pageIndex].classList.add("navbar-chosen");
    (_a = mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.children[pageIndex]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    pageActual = pageIndex;
    // console.log(pageActual);
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
    //always go to first page on reload
    goTo(0);
    //Making title vertical and spaced evenly
    const parents = document.getElementsByClassName("projects__scroll-box__item__title");
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
    makeScrollItemsSquare();
};
function goToActualPage() {
    goTo(pageActual);
}
function makeScrollItemsSquare() {
    const scrollItems = document.querySelectorAll(".projects__scroll-box__item");
    Array.from(scrollItems).forEach((item) => {
        item.style.width = item.offsetHeight + "px";
        item.style.minWidth = item.offsetHeight + "px";
    });
    const middleItemTitle = document.querySelectorAll(".projects__scroll-box__item__title");
    const scrollBox = document.querySelector(".projects__scroll-box");
    scrollBox.style.marginRight = middleItemTitle[0].offsetWidth * 1.2 + "px";
}
window.addEventListener("resize", () => {
    goToActualPage();
    makeScrollItemsSquare();
});
window.onunload = () => {
    window.removeEventListener("resize", goToActualPage);
    window.removeEventListener("wheel", ScrollFullPage);
};
