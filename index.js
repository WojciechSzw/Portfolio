var _a;
var pageActual = 0;
var wheeling = false;
var mainContainer = document.getElementById("main");
var navbarLink = document.getElementsByClassName("navbar-link");
var pagesCount = (_a = mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.children.length) !== null && _a !== void 0 ? _a : 0;
var timeoutID = -1;
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
    timeoutID = window.setTimeout(function () { return (wheeling = false); }, 600);
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
    for (var x = 0; x < document.getElementsByClassName("navbar-link").length; x++) {
        document
            .getElementsByClassName("navbar-link")[x].classList.remove("navbar-chosen");
    }
}
function goToPage(page) {
    window.location = page;
}
window.onload = function (a) {
    //always go to first page on reload
    goTo(0);
    //Making title vertical and spaced evenly
    var parents = document.getElementsByClassName("projects__scroll-box__item__title");
    Array.from(parents).forEach(function (div) {
        var title = div.children[0];
        var wholeText = title.innerHTML;
        Array.from(wholeText).forEach(function (letter) {
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
    var scrollItems = document.querySelectorAll(".projects__scroll-box__item");
    Array.from(scrollItems).forEach(function (item) {
        item.style.width = item.offsetHeight + "px";
        item.style.minWidth = item.offsetHeight + "px";
    });
    var middleItemTitle = document.querySelectorAll(".projects__scroll-box__item__title");
    var scrollBox = document.querySelector(".projects__scroll-box");
    scrollBox.style.marginRight = middleItemTitle[0].offsetWidth * 1.2 + "px";
}
window.addEventListener("resize", function () {
    goToActualPage();
    makeScrollItemsSquare();
});
window.onunload = function () {
    window.removeEventListener("resize", goToActualPage);
    window.removeEventListener("wheel", ScrollFullPage);
};
