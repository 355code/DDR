// Bliss by Luke Bergs | https://soundcloud.com/bergscloud/
// Creative Commons - Attribution-ShareAlike 3.0 Unported
// https://creativecommons.org/licenses/by-sa/3.0/
// Music promoted by https://www.chosic.com/free-music/all/


let ACTIVE = null;
const DIRECTIONS = ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight']

// const arrowTemplate = document.getElementById("arrow-template");
// const arrowPanel = document.getElementById("primary");

const board = document.getElementById("board");
const generator = document.getElementById("new-row-generator");
const playButton = document.getElementById('play-button');

const boardTop = board.getBoundingClientRect().top;
//console.log(boardTop)

const playAudio = (clip)=>{
    var audio = new Audio(clip);
    audio.play();
}

const handleKeyDown = (e) => {
    const directionIndex = DIRECTIONS.findIndex((direction) => direction === e.key)
    const activeArrow = ACTIVE.getAttribute('data-active')
if( directionIndex == activeArrow ){
console.log('hit')
ACTIVE.children[directionIndex].style.setProperty("--arrow-outline", "green")
const clip = './assets/win.wav';
playAudio(clip);
}else{
    console.log('miss')
    const clip = './assets/fail.wav';
playAudio(clip);
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
    console.log('row-top', rowTop)
    const proximity = rowTop - boardTop;
    if( proximity < 40 && proximity > - 20){
     //   console.log(row)
        ACTIVE = row;
    }
    row.style.transform = `translateY(${-i}px)`;
    i += 3;
  }, speed);

  setTimeout(()=>{
row.remove();
  },15000)
};

const startGame = (speed, interval) => {
    const clip = './assets/game-music.mp3';
    playAudio(clip);  
  document.addEventListener("keydown", handleKeyDown);
  setInterval(() => {
    createRow("blue", speed);
    console.log('row created')
  }, interval);
};


playButton.addEventListener('click', ()=>{
playButton.classList.add('hidden');
board.classList.remove('hidden')
startGame(2, 1000);
})
