import { get } from "./getElements.js";

const themes = get(".theme-balls");
const ball = get(".ball");

function themeSwitcher() {
  themes.addEventListener("click", function (e) {
    const theme = e.target.dataset.theme;

    if (!theme) return;

    function nextTheme(theme) {
      document.documentElement.classList = "";
      document.documentElement.classList.add(`theme-${theme}`);
      // ball.style.transform = "translateX(-110%)";
      ball.style.transform = `translateX(${
        theme == 1 ? -110 : theme == 2 ? 0 : theme == 3 ? 110 : 0
      }%)`;
    }
    nextTheme(theme);
  });
}

export default themeSwitcher;
