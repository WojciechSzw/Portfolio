"use strict";
let spinAnimationInProgress = false;
const spinAnimationTime = 1500;
let actualMiddleItemID = 1;
document.onkeydown = function (event) {
    console.log(event.key);
    switch (event.key) {
        case "ArrowLeft":
            console.log("lewo");
            spinLeft();
            break;
        case "ArrowRight":
            console.log("prawo");
            spinRight();
            break;
        case "ArrowDown":
            initializeItems();
            break;
    }
};
function spinRight() {
    if (spinAnimationInProgress === true)
        return;
    startSpinAnimationTimer();
    const scrollItems = document.querySelectorAll(".projects__scroll-box__item");
    for (let x = 0; x < scrollItems.length; x++) {
        const item = scrollItems[x];
        removeClassFromElement(item, "spin-to-left");
        switch (x) {
            case 0:
                const itemShadowL = document.querySelectorAll(".projects__scroll-box__item__shadowL")[0];
                if (item.classList.contains("spin-to-right__first-child")) {
                    var newItemShadowL = itemShadowL.cloneNode(true);
                    itemShadowL.parentNode?.replaceChild(newItemShadowL, itemShadowL);
                    var newItem = item.cloneNode(true);
                    item.parentNode?.replaceChild(newItem, item);
                }
                else {
                    itemShadowL.classList.add("shadow-opacity");
                    item.classList.add("spin-to-right__first-child");
                }
                break;
            case 1:
                if (item.classList.contains("spin-to-right__second-child")) {
                    var newItem = item.cloneNode(true);
                    item.parentNode?.replaceChild(newItem, item);
                }
                else {
                    item.classList.add("spin-to-right__second-child");
                }
                break;
            case 2:
                const itemShadowR = document.querySelector(".projects__scroll-box__item__shadowR");
                if (itemShadowR === null)
                    break;
                if (item.classList.contains("spin-to-right__third-child")) {
                    var newItemShadow = itemShadowR.cloneNode(true);
                    itemShadowR.parentNode?.replaceChild(newItemShadow, itemShadowR);
                    var newItem = item.cloneNode(true);
                    item.parentNode?.replaceChild(newItem, item);
                }
                else {
                    itemShadowR.classList.add("shadow-opacity");
                    item.classList.add("spin-to-right__third-child");
                }
                break;
            case 3:
                if (item.classList.contains("spin-to-right__fourth-child")) {
                    var newItem = item.cloneNode(true);
                    item.parentNode?.replaceChild(newItem, item);
                }
                else {
                    item.classList.add("spin-to-right__fourth-child");
                }
                break;
        }
    }
}
function spinLeft() {
    if (spinAnimationInProgress === true)
        return;
    startSpinAnimationTimer();
    const scrollItems = document.querySelectorAll(".projects__scroll-box__item");
    for (let x = 0; x < scrollItems.length; x++) {
        const item = scrollItems[x];
        removeClassFromElement(item, "spin-to-right");
        switch (x) {
            case 0:
                const itemShadowL = document.querySelectorAll(".projects__scroll-box__item__shadowL")[0];
                if (item.classList.contains("spin-to-left__first-child")) {
                    var newItemShadowL = itemShadowL.cloneNode(true);
                    itemShadowL.parentNode?.replaceChild(newItemShadowL, itemShadowL);
                    var newItem = item.cloneNode(true);
                    item.parentNode?.replaceChild(newItem, item);
                }
                else {
                    item.classList.add("spin-to-left__first-child");
                    itemShadowL.classList.add("shadow-opacity");
                }
                break;
            case 1:
                if (item.classList.contains("spin-to-left__second-child")) {
                    var newItem = item.cloneNode(true);
                    item.parentNode?.replaceChild(newItem, item);
                }
                else {
                    item.classList.add("spin-to-left__second-child");
                }
                break;
            case 2:
                const itemShadowR = document.querySelector(".projects__scroll-box__item__shadowR");
                if (itemShadowR === null)
                    break;
                if (item.classList.contains("spin-to-left__third-child")) {
                    var newItemShadow = itemShadowR.cloneNode(true);
                    itemShadowR.parentNode?.replaceChild(newItemShadow, itemShadowR);
                    var newItem = item.cloneNode(true);
                    item.parentNode?.replaceChild(newItem, item);
                }
                else {
                    itemShadowR.classList.add("shadow-opacity");
                    item.classList.add("spin-to-left__third-child");
                }
                break;
            case 3:
                if (item.classList.contains("spin-to-left__fourth-child")) {
                    var newItem = item.cloneNode(true);
                    item.parentNode?.replaceChild(newItem, item);
                }
                else {
                    item.classList.add("spin-to-left__fourth-child");
                }
                break;
        }
    }
}
function removeClassFromElement(HtmlElement, beginingOfClassName) {
    const prefix = beginingOfClassName;
    const classes = HtmlElement.className
        .split(" ")
        .filter((c) => !c.startsWith(prefix));
    HtmlElement.className = classes.join(" ").trim();
}
function startSpinAnimationTimer() {
    spinAnimationInProgress = true;
    setTimeout(function () {
        spinAnimationInProgress = false;
    }, spinAnimationTime);
}
const ListItems = [
    {
        id: "cfxpage-project",
        onclick: "",
        title: "Cfx lab page",
        imgSrc: "images/cfxpage.jpg",
        imgAlt: "cfximage",
    },
    {
        id: "snake-page",
        onclick: "goToProject('snake.html')",
        title: "Snake game",
        imgSrc: "images/snakegame.jpg",
        imgAlt: "snakeimg",
    },
    {
        id: "hold-page",
        onclick: "",
        title: "hold page",
        imgSrc: "images/holdimg.jpg",
        imgAlt: "holdimg",
    },
];
function initializeItems() {
    const items = document.querySelectorAll(".projects__scroll-box__item");
    const itemsTitles = document.querySelectorAll(".projects__scroll-box__item__title h3");
    const itemsImg = document.querySelectorAll(".projects__scroll-box__item img");
    for (let x = 0; x < items.length; x++) {
        switch (x) {
            case 0:
            case 1:
                items[x].id = ListItems[x].id; ////PODEJRZEWAM ŻE H3 I IMG JEST BRANY TYLKO PIERWSZY A NIE CAŁA LISTA
                itemsTitles[x].innerHTML = ListItems[x].title;
                itemsImg[x].src = ListItems[x].imgSrc;
                itemsImg[x].alt = ListItems[x].imgAlt;
                break;
        }
    }
}
function replaceItemsL() {
    const items = document.querySelectorAll(".projects__scroll-box__item");
    for (let x = 0; x < items.length; x++) {
        const item = items[x];
        switch (x) {
            case 1:
                break;
        }
    }
}
