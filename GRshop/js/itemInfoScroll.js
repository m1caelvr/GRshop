const imageSection = document.getElementById("imageSection");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

nextButton.addEventListener("click", () => {
  imageSection.scrollBy({ left: 400, behavior: "smooth" });
});

prevButton.addEventListener("click", () => {
  imageSection.scrollBy({ left: -400, behavior: "smooth" });
});

const inputs = document.querySelectorAll('.section-item .item-info .item-info-color input');

inputs.forEach(input => {
  input.addEventListener('click', () => {
    console.log(input.id);
  });
});

const bulletContainer = document.getElementById("bulletContainer");
for (let i = 0; i < imageSection.children.length; i++) {
  const bullet = document.createElement("span");
  bullet.classList.add("bullet");
  bulletContainer.appendChild(bullet);
}
const bullets = document.querySelectorAll(".bullet");
function updateBullets() {
  const currentImageIndex = Math.round(imageSection.scrollLeft / imageSection.children[0].offsetWidth);
  bullets.forEach((bullet, index) => {
    if (index === currentImageIndex) {
      bullet.classList.add("active");
    } else {
      bullet.classList.remove("active");
    }
  });
}
imageSection.addEventListener("scroll", updateBullets);
updateBullets();