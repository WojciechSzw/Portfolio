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
  }
};

function spinRight() {
  const scrollItems = document.querySelectorAll<HTMLElement>(
    ".projects__scroll-box__item"
  );
  for (let x = 0; x < scrollItems.length; x++) {
    const item = scrollItems[x];
    removeClassFromElement(item, "spin-to-left");

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
          itemShadowL.classList.add("shadow-opacity");
          item.classList.add("spin-to-right__first-child");
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
        const itemShadowR = document.querySelector<HTMLElement>(
          ".projects__scroll-box__item__shadowR"
        );
        if (itemShadowR === null) break;
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
          var newItem = item.cloneNode(true);
          item.parentNode?.replaceChild(newItem, item);
        } else {
          item.classList.add("spin-to-right__fourth-child");
        }
        break;
    }
  }
}

function spinLeft() {
  const scrollItems = document.querySelectorAll<HTMLElement>(
    ".projects__scroll-box__item"
  );
  for (let x = 0; x < scrollItems.length; x++) {
    const item = scrollItems[x];
    removeClassFromElement(item, "spin-to-right");

    switch (x) {
      case 0:
        const itemShadowL = document.querySelectorAll<HTMLElement>(
          ".projects__scroll-box__item__shadowL"
        )[0];

        if (item.classList.contains("spin-to-left__first-child")) {
          var newItemShadowL = itemShadowL.cloneNode(true);
          itemShadowL.parentNode?.replaceChild(newItemShadowL, itemShadowL);

          var newItem = item.cloneNode(true);
          item.parentNode?.replaceChild(newItem, item);
        } else {
          item.classList.add("spin-to-left__first-child");
          itemShadowL.classList.add("shadow-opacity");
        }
        break;
      case 1:
        if (item.classList.contains("spin-to-left__second-child")) {
          var newItem = item.cloneNode(true);
          item.parentNode?.replaceChild(newItem, item);
        } else {
          item.classList.add("spin-to-left__second-child");
        }
        break;
      case 2:
        const itemShadowR = document.querySelector<HTMLElement>(
          ".projects__scroll-box__item__shadowR"
        );
        if (itemShadowR === null) break;
        if (item.classList.contains("spin-to-left__third-child")) {
          var newItemShadow = itemShadowR.cloneNode(true);
          itemShadowR.parentNode?.replaceChild(newItemShadow, itemShadowR);

          var newItem = item.cloneNode(true);
          item.parentNode?.replaceChild(newItem, item);
        } else {
          itemShadowR.classList.add("shadow-opacity");
          item.classList.add("spin-to-left__third-child");
        }
        break;
      case 3:
        if (item.classList.contains("spin-to-left__fourth-child")) {
          var newItem = item.cloneNode(true);
          item.parentNode?.replaceChild(newItem, item);
        } else {
          item.classList.add("spin-to-left__fourth-child");
        }
        break;
    }
  }
}

function removeClassFromElement(
  HtmlElement: HTMLElement,
  beginingOfClassName: string
) {
  const prefix = beginingOfClassName;
  const classes = HtmlElement.className
    .split(" ")
    .filter((c) => !c.startsWith(prefix));
  HtmlElement.className = classes.join(" ").trim();
}
