function sayHi() {
  console.log("Hello, World!");
  alert("Hello, World!");
}

function getHiddenImgs() {
  const hiddenImgs = document.getElementsByClassName("section-image");
  return Array.from(hiddenImgs);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function removeClassFromElements(elements, className) {
  elements.forEach((element) => {
    removeClass(element, className);
  });
}

function addClassToElement(element, className) {
  element.classList.add(className);
}

function addClassToElements(elements, className) {
  elements.forEach((element) => {
    addClassToElement(element, className);
  });
}

function getCurrentSelection() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  return range;
}

function createElementAtPosition(position, element) {
  position.insertNode(element);
}

function createNewElement(elementType) {
  return document.createElement(elementType);
}

function appendElementToElement(element, elementToAppend) {
  element.appendChild(elementToAppend);
}

const slideableContent = document.getElementById("slideable-content");
const toggleButton = document.getElementById("toggle-button");

toggleButton.addEventListener("click", () => {
  if (slideableContent.classList.contains("hidden")) {
    slideableContent.classList.remove("hidden");
    // Force a reflow to ensure the 'hidden' removal is rendered
    void slideableContent.offsetWidth;
    slideableContent.classList.add("shown");
    document.body.classList.add("dimmed");
  } else {
    slideableContent.classList.remove("shown");
    document.body.classList.remove("dimmed");
    setTimeout(() => {
      slideableContent.classList.add("hidden");
    }, 300);
  }
});

document.addEventListener("click", (event) => {
  if (
    slideableContent.classList.contains("shown") &&
    !slideableContent.contains(event.target) &&
    event.target !== toggleButton
  ) {
    // Check if the click is NOT on the button
    slideableContent.classList.remove("shown");
    document.body.classList.remove("dimmed");
    setTimeout(() => {
      slideableContent.classList.add("hidden");
    }, 300);
  }
});

function fadeToggle(element, duration = 300) {
  // Default duration is 300ms
  if (element.style.opacity === "1" || element.style.opacity === "") {
    // Element is visible
    // Fade out
    let opacity = 1;
    const fadeOutInterval = setInterval(() => {
      opacity -= 0.1;
      element.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(fadeOutInterval);
        element.style.display = "none"; // Hide the element after fade out
      }
    }, duration / 10); // Adjust interval for smoother transition
  } else {
    // Element is hidden
    // Fade in
    element.style.display = "block"; // Make the element visible
    let opacity = 0;
    const fadeInInterval = setInterval(() => {
      opacity += 0.1;
      element.style.opacity = opacity;
      if (opacity >= 1) {
        clearInterval(fadeInInterval);
      }
    }, duration / 10);
  }
}
