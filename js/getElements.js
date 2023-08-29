export function getAll(selection) {
  const elements = document.querySelectorAll(selection);
  if (elements) return elements;
  else throw Error("element not selected...");
}

export function get(selection) {
  const element = document.querySelector(selection);
  if (element) return element;
  else throw Error("element not selected...");
}
