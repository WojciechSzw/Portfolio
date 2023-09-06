let pageActual: number = 0;
const pagesCount: number = 3;
let wheeling: boolean = false;

window.addEventListener("wheel", ScrollFullPage);

function ScrollFullPage(event: WheelEvent) {
  console.log(wheeling);
  if (!wheeling) {
    if (event.deltaY > 0 && pageActual < pagesCount - 1) {
      wheeling = true;
      document
        .getElementById("main")
        ?.children[pageActual + 1]?.scrollIntoView({ behavior: "smooth" });
      pageActual++;
      window.setTimeout(() => (wheeling = false), 1000);
    } else if (event.deltaY < 0 && pageActual > 0) {
      wheeling = true;
      document
        .getElementById("main")
        ?.children[pageActual - 1]?.scrollIntoView({ behavior: "smooth" });
      pageActual--;
      window.setTimeout(() => (wheeling = false), 1000);
    }
    console.log(pageActual);
  }
}
