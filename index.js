"use strict";
let pageActual = 0;
const pagesCount = 3;
let wheeling = false;
window.addEventListener("wheel", ScrollFullPage);
function ScrollFullPage(event) {
    var _a, _b, _c, _d;
    console.log(wheeling);
    if (!wheeling) {
        if (event.deltaY > 0 && pageActual < pagesCount - 1) {
            wheeling = true;
            (_b = (_a = document
                .getElementById("main")) === null || _a === void 0 ? void 0 : _a.children[pageActual + 1]) === null || _b === void 0 ? void 0 : _b.scrollIntoView({ behavior: "smooth" });
            pageActual++;
            window.setTimeout(() => (wheeling = false), 1000);
        }
        else if (event.deltaY < 0 && pageActual > 0) {
            wheeling = true;
            (_d = (_c = document
                .getElementById("main")) === null || _c === void 0 ? void 0 : _c.children[pageActual - 1]) === null || _d === void 0 ? void 0 : _d.scrollIntoView({ behavior: "smooth" });
            pageActual--;
            window.setTimeout(() => (wheeling = false), 1000);
        }
        console.log(pageActual);
    }
}
