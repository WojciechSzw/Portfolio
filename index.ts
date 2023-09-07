let pageActual: number = 0;
const pagesCount: number = 3;
let wheeling: boolean = false;
const mainContainer = document.getElementById("main");
const navbarLink = document.getElementsByClassName("navbar-link");

window.addEventListener("wheel", ScrollFullPage);

function ScrollFullPage(event: WheelEvent) {
  if (!wheeling) {
    deleteNavbarChosen(); //deleting every underline under navbar-link

    if (event.deltaY > 0 && pageActual < pagesCount - 1) {
      wheeling = true;
      navbarLink[pageActual + 1].classList.add("navbar-chosen"); //adding underline
      mainContainer?.children[pageActual + 1]?.scrollIntoView({
        behavior: "smooth",
      }); //going to another page
      pageActual++;
      window.setTimeout(() => (wheeling = false), 800); //sec break from scrolling
    } else if (event.deltaY < 0 && pageActual > 0) {
      wheeling = true;
      navbarLink[pageActual - 1].classList.add("navbar-chosen"); //adding underline
      mainContainer?.children[pageActual - 1]?.scrollIntoView({
        behavior: "smooth",
      }); //going to another page
      pageActual--;
      window.setTimeout(() => (wheeling = false), 800); //sec break from scrolling
    }
    console.log(pageActual);
  }
}

function goTo(pageName: string) {
  deleteNavbarChosen();
  switch (pageName) {
    case "about":
      navbarLink[0].classList.add("navbar-chosen");
      mainContainer?.children[0]?.scrollIntoView({ behavior: "smooth" });
      pageActual = 0;
      break;
    case "projects":
      navbarLink[1].classList.add("navbar-chosen");
      mainContainer?.children[1]?.scrollIntoView({ behavior: "smooth" });
      pageActual = 1;
      break;
    case "contact":
      navbarLink[2].classList.add("navbar-chosen");
      mainContainer?.children[2]?.scrollIntoView({ behavior: "smooth" });
      pageActual = 2;
      break;
    default:
  }
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
