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
  const scrollBox = document.querySelectorAll<HTMLElement>(
    ".projects__scroll-box"
  )[0];
  console.log(scrollBox);
  const scrollItems = document.querySelectorAll<HTMLElement>(
    ".projects__scroll-box__item"
  );
  for (let x = 0; x < 4; x++) {
    const item = scrollItems[x];

    switch (x) {
      case 0:
        const itemShadowL = document.querySelectorAll<HTMLElement>(
          ".projects__scroll-box__item__shadowL"
        )[0];

        if (item.classList.contains("spin-to-right__first-child")) {
          var newItemShadowL = itemShadowL.cloneNode(true);
          itemShadowL.parentNode?.replaceChild(newItemShadowL, itemShadowL);

          var newItem = item.cloneNode(true);
          item.parentNode?.replaceChild(newItem, item);
        } else {
          item.classList.add("spin-to-right__first-child");
          itemShadowL.classList.add("shadow-opacity");
        }

        break;
      case 1:
        if (item.classList.contains("spin-to-right__second-child")) {
          var newItem = item.cloneNode(true);
          item.parentNode?.replaceChild(newItem, item);
        } else {
          item.classList.add("spin-to-right__second-child");
        }
        break;
      case 2:
        const itemShadowR = document.querySelectorAll<HTMLElement>(
          ".projects__scroll-box__item__shadowR"
        )[0];
        if (item.classList.contains("spin-to-right__third-child")) {
          var newItemShadow = itemShadowR.cloneNode(true);
          itemShadowR.parentNode?.replaceChild(newItemShadow, itemShadowR);

          var newItem = item.cloneNode(true);
          item.parentNode?.replaceChild(newItem, item);
        } else {
          itemShadowR.classList.add("shadow-opacity");
          item.classList.add("spin-to-right__third-child");
        }
        break;
      case 3:
        if (item.classList.contains("spin-to-right__fourth-child")) {
          // var newItemShadow = itemShadowR.cloneNode(true);
          // itemShadowR.parentNode?.replaceChild(newItemShadow, itemShadowR);

          var newItem = item.cloneNode(true);
          item.parentNode?.replaceChild(newItem, item);
        } else {
          //itemShadowR.classList.add("shadow-opacity");
          item.classList.add("spin-to-right__fourth-child");
        }
        break;
    }
  }
}
