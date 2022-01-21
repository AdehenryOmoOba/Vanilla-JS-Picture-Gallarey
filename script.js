const lightBoxEnabled = document.querySelectorAll(".lightbox-enabled");
const imageArray = Array.from(lightBoxEnabled);
const lastImageIndex = imageArray.length - 1;
const lightBoxBtn = document.querySelectorAll(".lightbox-btn");
const lightBoxBtnLeft = document.querySelector("#left");
const lightBoxBtnRight = document.querySelector("#right");
const lightBoxContainer = document.querySelector(".lightbox-container");
const lightBoxImage = document.querySelector(".lightbox-image");
let activeImage;

function showLightBox() {
  lightBoxContainer.classList.add("active");
}

function hideLightBox() {
  lightBoxContainer.classList.remove("active");
}

function removeInactiveClass() {
  lightBoxBtn.forEach((btn) => {
    btn.classList.remove("inactive");
  });
}

function setLightBoxImage(image) {
  lightBoxImage.src = image.dataset.imagesrc;
  activeImage = imageArray.indexOf(image);
  removeInactiveClass();
  switch (activeImage) {
    case 0:
      lightBoxBtnLeft.classList.add("inactive");
      break;
    case lastImageIndex:
      lightBoxBtnRight.classList.add("inactive");
      break;
    default:
      removeInactiveClass();
  }
}

lightBoxEnabled.forEach((image) => {
  image.addEventListener("click", () => {
    showLightBox();
    setLightBoxImage(image);
  });
});

lightBoxContainer.addEventListener("click", () => {
  hideLightBox();
});

function moveSlidesRight() {
  activeImage === lastImageIndex
    ? setLightBoxImage(imageArray[0])
    : setLightBoxImage(imageArray[activeImage].nextElementSibling);
}
function moveSlidesleft() {
  activeImage === 0
    ? setLightBoxImage(imageArray[lastImageIndex])
    : setLightBoxImage(imageArray[activeImage].previousElementSibling);
}

function moveSlides(direction) {
  direction === "right" ? moveSlidesRight() : moveSlidesleft();
}

lightBoxBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.stopPropagation();
    const direction = event.target.getAttribute("id");
    moveSlides(direction);
  });
});

window.addEventListener("keydown", (event) => {
  if (!lightBoxContainer.classList.contains("active")) {
    return;
  } else if (event.key === "ArrowRight") {
    moveSlidesRight();
  } else if (event.key === "ArrowLeft") {
    moveSlidesleft();
  } else {
    lightBoxContainer.classList.remove("active");
  }
});
