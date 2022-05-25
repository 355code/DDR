const DOWN = "45deg";
const LEFT = "135deg";
const UP = "225deg";
const RIGHT = "315deg";
const BLOCK = [LEFT, UP, DOWN, RIGHT];

const arrowTemplate = document.getElementById("arrow-template");
const arrowPanel = document.getElementById("primary");

const createArrow = (outineColor, arrowColor, direction) => {
  const newArrow = arrowTemplate.cloneNode(true);
  newArrow.style.setProperty("--arrow-outline", outineColor);
  newArrow.style.setProperty("--arrow-color", arrowColor);
  newArrow.style.setProperty("--rotation", direction);
  return newArrow;
};

BLOCK.forEach((direction) => {
  const newPanelArrow = createArrow("white", "black", direction);
  arrowPanel.append(newPanelArrow);
});

const generateRandomArrowBlock = () => {
  const newBlock = document.createElement("div");
  newBlock.classList.add("arrow-block");

  const randomizer = Math.floor(Math.random() * 4);

  BLOCK.forEach((direction, index) => {
    let arrowToAdd;
    if (index === randomizer) {
      arrowToAdd = createArrow("lightblue", "white", direction);
    } else {
      arrowToAdd = createArrow("transparent", "transparent", direction);
    }
    newBlock.append(arrowToAdd);
    return newBlock;
  });
};

const animateBlock = () => {
  const toAnimate = generateRandomArrowBlock();

  const keyframes = [{ transform: "translateY(-300px)" }];

  const options = {
    duration: 1000,
  };

  toAnimate.animate(keyframes, options);
};

animateBlock();
