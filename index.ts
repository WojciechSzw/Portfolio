let pageActual = 0;
let wheeling = false;
const mainContainer = document.getElementById("main");
const navbarLink = document.getElementsByClassName("navbar-link");
const pagesCount = mainContainer?.children.length ?? 0;
let timeoutID = -1;

window.addEventListener("wheel", ScrollFullPage);

function ScrollFullPage(event: WheelEvent) {
  if (wheeling || Math.abs(event.deltaY) < 30) return;
  wheeling = true;
  timeoutID = -1;
  if (event.deltaY > 0 && pageActual < pagesCount - 1) {
    goTo(pageActual + 1);
  } else if (event.deltaY < 0 && pageActual > 0) {
    goTo(pageActual - 1);
  }
  timeoutID = window.setTimeout(() => (wheeling = false), 600);
}

function goTo(pageIndex: number) {
  deleteNavbarChosen();
  navbarLink[pageIndex].classList.add("navbar-chosen");
  mainContainer?.children[pageIndex]?.scrollIntoView({ behavior: "smooth" });
  pageActual = pageIndex;
}

//deletes navbar-chosen class (underline) from every element
function deleteNavbarChosen() {
  for (
    let x = 0;
    x < document.getElementsByClassName("navbar-link").length;
    x++
  ) {
    document
      .getElementsByClassName("navbar-link")
      [x].classList.remove("navbar-chosen");
  }
}

function goToProject(page: string) {
  window.location.href = page;
}

function goToActualPage() {
  goTo(pageActual);
}

function makeScrollItemsSquare() {
  const scrollItems = document.querySelectorAll<HTMLElement>(
    ".projects__scroll-box__item"
  );
  Array.from(scrollItems).forEach((item) => {
    item.style.width = item.offsetHeight + "px";
    item.style.minWidth = item.offsetHeight + "px";
  });

  const middleItemTitle = document.querySelectorAll<HTMLElement>(
    ".projects__scroll-box__item__title"
  );
  const scrollBox = document.querySelector<HTMLElement>(
    ".projects__scroll-box"
  );

  scrollBox!.style.marginRight = middleItemTitle[0].offsetWidth * 1.2 + "px";

  //making thrown out img on right place
  scrollItems[3].style.left =
    "calc(50% - " + scrollItems[3].offsetWidth / 2 + "px)";
}

function heightScrollBox() {
  //set also by css(idk why but without it doesnt werk :( )
  const scrollBox = document.querySelector<HTMLElement>(
    ".projects__scroll-box"
  );
  const titleHeight =
    document.querySelector<HTMLElement>(".projects__title")?.offsetHeight;
  if (scrollBox != undefined && titleHeight != undefined) {
    scrollBox.style.height = "calc(90% - " + (titleHeight + 100) + "px)";
  }
}

function verticalTitles() {
  //Making title vertical and spaced evenly
  const parents = document.querySelectorAll<HTMLElement>(
    ".projects__scroll-box__item__title"
  );
  //deleting other h3 (if they are)
  for (let x = 0; x < parents.length; x++) {
    const titleBox = parents[x];
    if (titleBox.children[1]!) {
      for (let y = titleBox.children.length - 1; y > 0; y--) {
        titleBox.children[y].remove();
      }
    }
    // back to Making title vertical and spaced evenly
    const LettersInTitle: HTMLCollection = titleBox.children;
    const wholeText = LettersInTitle[0].innerHTML;
    Array.from(wholeText).forEach((letter) => {
      const letterClass =
        "class='projects__scroll-box__item__title__letter" + x + "'";
      if (letter !== " ") {
        titleBox.insertAdjacentHTML(
          "beforeend",
          "<h3 " + letterClass + ">" + letter + "</h3>"
        );
      } else {
        titleBox.insertAdjacentHTML(
          "beforeend",
          "<h3 " + letterClass + ">" + "&nbsp" + "</h3>"
        );
      }
    });
    LettersInTitle[0].remove();
  }
  TitleLettersSize();
}

//dynamicly editing size of font if title does not fit into container
function TitleLettersSize() {
  const parents = document.querySelectorAll<HTMLElement>(
    ".projects__scroll-box__item__title"
  );
  for (let x = 0; x < parents.length; x++) {
    const titleBox = parents[x];
    const LettersInTitle: HTMLCollection = titleBox.children;
    const letters = document.querySelectorAll<HTMLElement>(
      `.projects__scroll-box__item__title__letter${x}`
    );
    //while text is too big:
    while (
      LettersInTitle.length * (LettersInTitle[0] as HTMLElement).offsetHeight >
      titleBox.offsetHeight
    ) {
      const style = getComputedStyle(letters[0]);
      letters.forEach((letter) => {
        // Set the font size for each element
        letter.style.fontSize =
          parseFloat(style.fontSize.slice(0, -2)) - 1 + "px";
      });
    }
    //if tekst is too small:
    if (
      LettersInTitle.length * (LettersInTitle[0] as HTMLElement).offsetHeight <
      titleBox.offsetHeight - 50
    ) {
      const style = getComputedStyle(letters[0]);
      letters.forEach((letter) => {
        // Set the font size for each element
        letter.style.fontSize =
          parseFloat(style.fontSize.slice(0, -2)) + 1 + "px";
      });
    }
  }
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
  TitleLettersSize();
});

window.onunload = () => {
  window.removeEventListener("resize", goToActualPage);
  window.removeEventListener("wheel", ScrollFullPage);
};
