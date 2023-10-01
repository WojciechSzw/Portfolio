"use strict";
document.onkeydown = function (event) {
    console.log(event.key);
    switch (event.key) {
        case "ArrowLeft":
            console.log("lewo");
            break;
        case "ArrowRight":
            console.log("prawo");
            spinRight();
            break;
    }
};
function spinRight() {
    const scrollBox = document.querySelectorAll(".projects__scroll-box")[0];
    console.log(scrollBox);
    const scrollItems = document.querySelectorAll(".projects__scroll-box__item");
    for (let x = 0; x < 3; x++) {
        const item = scrollItems[x];
        switch (x) {
            case 0:
                if (item.classList.contains("spin-to-right__first-child")) {
                    var newItem = item.cloneNode(true);
                    item.parentNode?.replaceChild(newItem, item);
                }
                else {
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
                if (item.classList.contains("spin-to-right__third-child")) {
                    var newItem = item.cloneNode(true);
                    item.parentNode?.replaceChild(newItem, item);
                }
                else {
                    item.classList.add("spin-to-right__third-child");
                }
                break;
        }
    }
}
