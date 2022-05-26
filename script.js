// Bliss by Luke Bergs | https://soundcloud.com/bergscloud/
// Creative Commons - Attribution-ShareAlike 3.0 Unported
// https://creativecommons.org/licenses/by-sa/3.0/
// Music promoted by https://www.chosic.com/free-music/all/

let ACTIVE = null;
const DIRECTIONS = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];
const COLORS = ["red", "orange", "yellow", "green", "blue", "purple"]
let POINTS = 0;

// const arrowTemplate = document.getElementById("arrow-template");
// const arrowPanel = document.getElementById("primary");

const board = document.getElementById("board");
const generator = document.getElementById("new-row-generator");
const playButton = document.getElementById("play-button");
const pointCounter = document.getElementById("points");


const boardTop = board.getBoundingClientRect().top;
//console.log(boardTop)

const playAudio = (clip) => {
  var audio = new Audio(clip);
  audio.play();
};

const handleKeyDown = (e) => {
  const directionIndex = DIRECTIONS.findIndex(
    (direction) => direction === e.key
  );
  const activeArrow = ACTIVE.getAttribute("data-active");
  if (directionIndex == activeArrow) {
    console.log("hit");
    ACTIVE.children[directionIndex].style.setProperty(
      "--arrow-outline",
      "lightgreen"
    );
    ACTIVE.children[directionIndex].style.setProperty(
        "--arrow-color",
        "lightgreen"
      );
    POINTS++
    pointCounter.innerHTML = `Points: ${POINTS}`
    const clip = "./assets/win.wav";
    playAudio(clip);
  } else {
    console.log("miss");
    const clip = "./assets/fail.wav";
    playAudio(clip);
    // ACTIVE.children[directionIndex].style.setProperty("--arrow-outline", "red")
  }
};

const createRow = (outineColor, speed) => {
  const newRow = board.cloneNode(true);
  newRow.style.position = "absolute";
  const randomizer = Math.floor(Math.random() * 4);
  newRow.setAttribute("data-active", randomizer);
  for (let i = 0; i < 4; i++) {
    if (i === randomizer) {
      newRow.children[i].style.setProperty("--arrow-outline", outineColor);
    } else {
      newRow.children[i].style.setProperty("--arrow-outline", "transparent");
      newRow.children[i].style.setProperty("--arrow-color", "transparent");
    }
  }
  generator.append(newRow);
  animateRow(newRow, speed);
  console.log(randomizer);
};

const animateRow = (row, speed) => {
  const rowTop = row.getBoundingClientRect().top;
  const proximity = rowTop - boardTop;

  setTimeout(() => {
    ACTIVE = row;
    setTimeout(() => {
      if (ACTIVE === row) {
        ACTIVE = null;
      }
    }, (1/speed)* 70);
  }, (1/speed) * (proximity - 50));

  const options = [{ transform: "translateY(-10000px)" }];

  const keyframes = {
    duration: (1/speed)*10000, //1 pix every 2 mil
    iterations: Infinity,
  };

  row.animate(options, keyframes);

  setTimeout(() => {
    row.remove();
  }, (1/speed)*10000);
};

const startGame = (speed, interval) => { //speed = pixels per milisecond
  const clip = "./assets/game-music.mp3";
  playAudio(clip);
  document.addEventListener("keydown", handleKeyDown);
  setInterval(() => {
    const colorRandomizer = Math.floor(Math.random() * 6);
    const color = COLORS[colorRandomizer];
    createRow(color, speed);
  }, interval);
};

playButton.addEventListener("click", () => {
  playButton.classList.add("hidden");
  board.classList.remove("hidden");
  startGame(0.7, 700);
});
