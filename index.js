"use strict";
let pageActual = 0;
let wheeling = false;
const mainContainer = document.getElementById("main");
const navbarLink = document.getElementsByClassName("navbar-link");
const pagesCount = mainContainer?.children.length ?? 0;
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
    deleteNavbarChosen();
    navbarLink[pageIndex].classList.add("navbar-chosen");
    mainContainer?.children[pageIndex]?.scrollIntoView({ behavior: "smooth" });
    pageActual = pageIndex;
}
//deletes navbar-chosen class (underline) from every element
function deleteNavbarChosen() {
    for (let x = 0; x < document.getElementsByClassName("navbar-link").length; x++) {
        document
            .getElementsByClassName("navbar-link")[x].classList.remove("navbar-chosen");
    }
}
function goToProject(page) {
    window.location.href = page;
}
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
    //making thrown out img on right place
    scrollItems[3].style.left =
        "calc(50% - " + scrollItems[3].offsetWidth / 2 + "px)";
}
function heightScrollBox() {
    //set also by css(idk why but without it doesnt werk :()
    const scrollBox = document.querySelector(".projects__scroll-box");
    if (scrollBox != undefined) {
        scrollBox.style.height = "calc(80% - 100px)";
    }
}
function verticalTitles() {
    //Making title vertical and spaced evenly
    const parents = document.getElementsByClassName("projects__scroll-box__item__title");
    //deleting other h3 (if they are)
    Array.from(parents).forEach((div) => {
        if (div.children[1]) {
            for (let y = div.children.length - 1; y > 0; y--) {
                div.children[y].remove();
            }
        }
        // back to Making title vertical and spaced evenly
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
}
window.onload = (a) => {
    //always go to first page on reload
    goTo(0);
    verticalTitles();
    replaceItems(0);
    makeScrollItemsSquare();
    heightScrollBox();
};
window.addEventListener("resize", () => {
    goToActualPage();
    makeScrollItemsSquare();
    heightScrollBox();
});
window.onunload = () => {
    window.removeEventListener("resize", goToActualPage);
    window.removeEventListener("wheel", ScrollFullPage);
};
