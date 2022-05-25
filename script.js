let ACTIVE = null;
const DIRECTIONS = ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight']

// const arrowTemplate = document.getElementById("arrow-template");
// const arrowPanel = document.getElementById("primary");

const board = document.getElementById("board");
const generator = document.getElementById("new-row-generator");

const boardTop = board.getBoundingClientRect().top;
console.log(boardTop)

const handleKeyDown = (e) => {
    const directionIndex = DIRECTIONS.findIndex((direction) => direction === e.key)
    const activeArrow = ACTIVE.getAttribute('data-active')
if( directionIndex == activeArrow ){
console.log('hit')
ACTIVE.children[directionIndex].style.setProperty("--arrow-outline", "green")
}else{
    console.log('miss')
   // ACTIVE.children[directionIndex].style.setProperty("--arrow-outline", "red")
}  
};

const createRow = (outineColor, speed) => {
  const newRow = board.cloneNode(true);
  newRow.style.position = "absolute";
  const randomizer = Math.floor(Math.random() * 4);
  newRow.setAttribute('data-active', randomizer)
  for (let i = 0; i < 4; i++) {
    if (i === randomizer) {
      newRow.children[i].style.setProperty("--arrow-outline", outineColor);
    } else {
      newRow.children[i].style.setProperty("--arrow-outline", "transparent");
      newRow.children[i].style.setProperty("--arrow-color", 'transparent');

    }
  }
  generator.append(newRow);
  animateRow(newRow, speed);
};

const animateRow = (row, speed) => {
  let i = 0;
  setInterval(() => {
    const rowTop = row.getBoundingClientRect().top;
    const proximity = rowTop - boardTop;
    if( proximity < 40 && proximity > - 20){
        console.log(row)
        ACTIVE = row;
    }
    row.style.transform = `translateY(${-i}px)`;
    i += 1;
  }, speed);

  setTimeout(()=>{
row.remove();
  },5000)
};

const startGame = (speed, interval) => {
  document.addEventListener("keydown", handleKeyDown);
  setInterval(() => {
    createRow("blue", speed);
  }, interval);
};

startGame(1, 1000);
