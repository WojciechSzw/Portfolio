document.onkeydown = function(event) {
console.log(event.key)
switch(event.key) {
    case "ArrowLeft":
        console.log("lewo")
        break;
    case "ArrowRight":
        console.log("prawo")
        spinRight();
        break;
}
}

function spinRight() {
    const scrollItems = document.querySelectorAll(".projects__scroll-box__item")
    Array.from(scrollItems).forEach(function (item){
        console.log(item)
    })
}