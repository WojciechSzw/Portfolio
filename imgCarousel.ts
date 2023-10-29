let spinAnimationInProgress = false;
const spinAnimationTime = 500;
const initialItemsID = { left: 0, middle: 1, right: 2, behind: 3 };
let actualItemsID = { left: 0, middle: 1, right: 2, behind: 3 };

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
    case "Enter":
      break;
  }
};

function spinRight() {
  if (spinAnimationInProgress === true) return;
  startSpinAnimationTimer();
  replaceItems(-1);

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
  TitleLettersSize();
}

function spinLeft() {
  if (spinAnimationInProgress === true) return;
  startSpinAnimationTimer();
  replaceItems(1);

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

  TitleLettersSize();
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

function startSpinAnimationTimer() {
  spinAnimationInProgress = true;
  setTimeout(function () {
    spinAnimationInProgress = false;
  }, spinAnimationTime);
}

function replaceItems(direction: number) {
  const ListItems = [
    {
      id: "cfxpage-project",
      onclick: "window.open('//wojciechszw.github.io/CFXlab-page/')",
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
      title: "FullStack project",
      imgSrc: "images/fullstackIncoming.jpg",
      imgAlt: "fullstackProjectImg",
    },
    {
      id: "hold-page",
      onclick: "",
      title: "hold page",
      imgSrc: "images/holdimg.jpg",
      imgAlt: "holdimg",
    },
  ];
  const items = document.querySelectorAll<HTMLElement>(
    ".projects__scroll-box__item"
  );
  const itemsTitlesDivs = document.querySelectorAll<HTMLElement>(
    ".projects__scroll-box__item__title"
  );
  const itemsImg = document.querySelectorAll<HTMLImageElement>(
    ".projects__scroll-box__item img"
  );
  const newItemsID = {
    left: 0,
    middle: 0,
    right: 0,
    behind: 0,
  };
  function settingPositionOfNewItems() {
    switch (direction) {
      case -1:
        if (actualItemsID.left === 0) {
          newItemsID.left = ListItems.length - 1;
        } else {
          newItemsID.left = actualItemsID.left - 1;
        }
        newItemsID.middle = actualItemsID.left;
        newItemsID.right = actualItemsID.middle;
        newItemsID.behind = actualItemsID.right;
        break;
      case 0:
        newItemsID.left = initialItemsID.left;
        newItemsID.middle = initialItemsID.middle;
        newItemsID.right = initialItemsID.right;
        newItemsID.behind = initialItemsID.behind;
        break;
      case 1:
        if (actualItemsID.right === ListItems.length - 1) {
          newItemsID.right = 0;
        } else {
          newItemsID.right = actualItemsID.right + 1;
        }
        newItemsID.left = actualItemsID.middle;
        newItemsID.middle = actualItemsID.right;
        newItemsID.behind = actualItemsID.left;
        break;
    }
  }
  settingPositionOfNewItems();

  for (let x = 0; x < items.length; x++) {
    switch (x) {
      case 0:
        items[x].id = ListItems[newItemsID.left].id;
        itemsTitlesDivs[x].children[0].innerHTML =
          ListItems[newItemsID.left].title;
        itemsImg[x].src = ListItems[newItemsID.left].imgSrc;
        itemsImg[x].alt = ListItems[newItemsID.left].imgAlt;
        break;
      case 1:
        items[x].id = ListItems[newItemsID.middle].id;
        items[x].setAttribute("onclick", ListItems[newItemsID.middle].onclick);
        itemsTitlesDivs[x].children[0].innerHTML =
          ListItems[newItemsID.middle].title;
        itemsImg[x].src = ListItems[newItemsID.middle].imgSrc;
        itemsImg[x].alt = ListItems[newItemsID.middle].imgAlt;
        break;
      case 2:
        items[x].id = ListItems[newItemsID.right].id;
        itemsTitlesDivs[x].children[0].innerHTML =
          ListItems[newItemsID.right].title;
        itemsImg[x].src = ListItems[newItemsID.right].imgSrc;
        itemsImg[x].alt = ListItems[newItemsID.right].imgAlt;
        break;
      case 3:
        items[x].id = ListItems[newItemsID.behind].id;
        itemsTitlesDivs[x].children[0].innerHTML =
          ListItems[newItemsID.behind].title;
        itemsImg[x].src = ListItems[newItemsID.behind].imgSrc;
        itemsImg[x].alt = ListItems[newItemsID.behind].imgAlt;
        break;
    }
  }
  verticalTitles();
  actualItemsID.left = newItemsID.left;
  actualItemsID.middle = newItemsID.middle;
  actualItemsID.right = newItemsID.right;
  actualItemsID.behind = newItemsID.behind;
}
