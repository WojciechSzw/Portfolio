let pageActual: number = 0;
const pagesCount: number = 3;
let wheeling: boolean = false;
const mainContainer = document.getElementById("main");
const navbarLink = document.getElementsByClassName("navbar-link");
let timeoutID: number = -1;
let TouchpadFix: number = 0;

window.addEventListener("wheel", ScrollFullPage);

function ScrollFullPage(event: WheelEvent) {
  if (!wheeling) {
    wheeling = true;
    timeoutID = -1;
    TouchpadFix = 0;
    if (event.deltaY > 0 && pageActual < pagesCount - 1) {
      goTo(pageActual + 1);
    } else if (event.deltaY < 0 && pageActual > 0) {
      goTo(pageActual - 1);
    }
  }

  if (timeoutID === -1) {
    console.log("timer");
    timeoutID = window.setTimeout(() => (wheeling = false), 400);
  } //if someone started scrolling to other page
  else if (TouchpadFix < 200) {
    TouchpadFix++;
    console.log("timer 50");
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => (wheeling = false), 400);
  } //if someone is still scrolling, the timer resets
}

function goTo(pageName: number) {
  deleteNavbarChosen();
  switch (pageName) {
    case 0:
      navbarLink[0].classList.add("navbar-chosen");
      mainContainer?.children[0]?.scrollIntoView({ behavior: "smooth" });
      pageActual = 0;
      break;
    case 1:
      navbarLink[1].classList.add("navbar-chosen");
      mainContainer?.children[1]?.scrollIntoView({ behavior: "smooth" });
      pageActual = 1;
      break;
    case 2:
      navbarLink[2].classList.add("navbar-chosen");
      mainContainer?.children[2]?.scrollIntoView({ behavior: "smooth" });
      pageActual = 2;
      break;
    default:
  }
  console.log(pageActual);
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
