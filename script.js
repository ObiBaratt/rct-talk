const tasks = getAllElementsThatIncludeText("task", false);
const slideableContent = document.getElementById("slideable-content");
const toggleButton = document.getElementById("toggle-button");

function getFirstElementByText(text, caseSensitive = true) {
  // returns element or null
  const allElements = document.querySelectorAll("*");
  if (caseSensitive) {
    return allElements.find((element) => element.textContent.trim() === text);
  } else {
    return allElements.find(
      (element) =>
        element.textContent.trim().toLowerCase() === text.toLowerCase()
    );
  }
}

function getAllElementsThatIncludeText(text, caseSenitive = true) {
  const allElements = document.querySelectorAll("*");
  const elements = [];
  for (const element of allElements) {
    if (element.children.length > 0) {
      continue;
    }

    if (caseSenitive) {
      if (element.textContent.trim().includes(text)) {
        elements.push(element);
      }
    } else if (
      element.textContent.trim().toLowerCase().includes(text.toLowerCase())
    ) {
      elements.push(element);
    }
  }
  return elements;
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

function fade(element, duration = 500) {
  const isVisible =
    element.style.opacity === "1" || element.style.opacity === "";

  // Store original display if not already stored
  if (!element.dataset.originalDisplay) {
    element.dataset.originalDisplay = window.getComputedStyle(element).display;
  }
  const originalDisplay = element.dataset.originalDisplay;

  element.style.transition = `opacity ${duration}ms ease`;

  if (isVisible) {
    // Fade out
    element.style.opacity = 0;
    setTimeout(() => {
      element.style.display = "none";
    }, duration);
  } else {
    // Fade in
    element.style.opacity = 0;
    element.style.display = originalDisplay;
    element.style.visibility = "visible"; // Ensure visibility
    element.offsetWidth; // Trigger reflow
    element.style.opacity = 1;
  }
}

function slide(element, direction = "right", dim = true) {
  const validDirections = ["left", "right", "top", "bottom"];
  if (!validDirections.includes(direction)) {
    console.error("Invalid direction. Choose from: left, right, top, bottom");
    return;
  }

  element.style.transform = getHiddenTransform(direction);
  element.classList.remove("panelHidden");
  element.classList.add(
    `slideFrom${direction.charAt(0).toUpperCase() + direction.slice(1)}`
  );

  element.offsetHeight;

  element.style.transition = "transform 0.3s ease-in-out";
  element.style.transform = "translate(0, 0)";

  let overlay;
  if (dim) {
    overlay = document.createElement("div");
    overlay.className = "dimOverlay";
    document.body.appendChild(overlay);
    document.body.classList.add("overlayed");
  }

  const reverseSlide = () => {
    element.style.transform = getHiddenTransform(direction);

    element.addEventListener(
      "transitionend",
      () => {
        element.classList.add("panelHidden");
        element.classList.remove(
          `slideFrom${direction.charAt(0).toUpperCase() + direction.slice(1)}`
        );
        element.style.transform = "";
        element.style.transition = "";
        if (overlay) {
          overlay.remove();
          document.body.classList.remove("overlayed");
        }
      },
      { once: true }
    );
  };

  const handleClickOutside = (event) => {
    if (!element.contains(event.target)) {
      reverseSlide();
      document.removeEventListener("click", handleClickOutside);
    }
  };

  // Need to delay or the initial click triggers
  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 50);
}

function getHiddenTransform(direction) {
  switch (direction) {
    case "left":
      return "translateX(-100%)";
    case "right":
      return "translateX(100%)";
    case "top":
      return "translateY(-100%)";
    case "bottom":
      return "translateY(100%)";
  }
}


const slideToggleButton = document.getElementById("slideToggleButton");
const slideablePanel = document.getElementById("slideablePanel");

slideToggleButton.addEventListener("click", () => {
  slidez(slideablePanel, "left", true);
});
