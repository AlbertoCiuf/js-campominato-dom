//dichiaro le variabili
const grid = document.getElementById('grid');
const playButton = document.getElementById('play-button');
const difficulty = document.getElementById('difficulty');
let chosenDifficulty;

const bombs = [];
const BOMBS_NUMBER = 16;


// funzione che al click del pulsante "Play!" genera le griglie in base alla difficoltà scelta
playButton.addEventListener('click', function() {
  chosenDifficulty = parseInt(difficulty.value);
  grid.innerHTML="";
  //console.log('click');
  
  if (chosenDifficulty===1) {
    for (let i=0; i<100; i++) {
      const square = generateSquare(grid);
      square.innerHTML = i+1;
    }
    for (let i=0; i<BOMBS_NUMBER; i++) {
      let bomb = getRandomInt(1,100);
      if (!bombs.includes(bomb)) bombs.push(bomb);
      else i--;
   }

  } else if (chosenDifficulty===2) {
    for (let i=0; i<81; i++) {
      const square = generateSquare(grid);
      square.innerHTML = i+1;
    }
    for (let i=0; i<BOMBS_NUMBER; i++) {
      let bomb = getRandomInt(1,81);
      if (!bombs.includes(bomb)) bombs.push(bomb);
      else i--;
   }
  } else {
    for (let i=0; i<49; i++) {
      const square = generateSquare(grid);
      square.innerHTML = i+1;
    }
    for (let i=0; i<BOMBS_NUMBER; i++) {
      let bomb = getRandomInt(1,49);
      if (!bombs.includes(bomb)) bombs.push(bomb);
      else i--;
   }
   console.log(bombs);

  }

});

//funzione che genera i quadrati delle griglie
function generateSquare(target) {
  const sq = document.createElement('div');
  sq.className = 'square';

  if (chosenDifficulty === 1) {
    sq.classList.add('easy');
  } else if (chosenDifficulty === 2) {
    sq.classList.add('normal');
  } else {
    sq.classList.add('hard');

  }

  //onClick delle celle
  sq.addEventListener('click', function(event){
    this.classList.add('clicked');
    //console.log(event.target.innerText);
  });



  target.append(sq);
  return sq;
}


function getRandomInt(min,max) {
  return Math.floor(Math.random()*(max - min + 1) + min);
}


