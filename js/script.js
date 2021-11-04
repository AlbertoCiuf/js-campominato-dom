//dichiaro le variabili
const grid = document.getElementById('grid');
const playButton = document.getElementById('play-button');
const difficulty = document.getElementById('difficulty');
let chosenDifficulty;
let squareNumber=0;
let result=false;
let scoreCounter=0;
let bombs = [];
const BOMBS_NUMBER = 16;
const endMessage = document.getElementById('end-message');


// funzione che al click del pulsante "Play!" genera le griglie in base alla difficoltà scelta
playButton.addEventListener('click', function() {
  playGame();
});




//funzione che fa iniziare il gioco
function playGame(){
  chosenDifficulty = parseInt(difficulty.value);
  grid.innerHTML="";
  bombs=[];

  if (chosenDifficulty===1) {
    squareNumber=100;
    //genero le bombe verificando che non ci siano doppioni
    generateBombs(squareNumber);

    //genero i quadrati della griglia
    for (let i=0; i<squareNumber; i++) {
      const square = generateSquare(grid);
      square.innerHTML = i+1;
    }
    

  } else if (chosenDifficulty===2) {
    squareNumber = 81;
    //genero le bombe verificando che non ci siano doppioni
    generateBombs(squareNumber);
    //genero i quadrati della griglia
    for (let i=0; i<squareNumber; i++) {
      const square = generateSquare(grid);
      square.innerHTML = i+1;
    }
  
  } else {
    squareNumber=49;
    //genero le bombe verificando che non ci siano doppioni
    generateBombs(squareNumber);
    //genero i quadrati della griglia
    for (let i=0; i<squareNumber; i++) {
      const square = generateSquare(grid);
      square.innerHTML = i+1;
    }
  }


  //array sortato e log per provare a vincere e testare il messaggio di vittoria
      bombs.sort(function(a,b){
        return a-b;
      });
      console.log(bombs);
}


//funzione che genera i quadrati delle griglie in base alla difficoltà scelta
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


//Verifico che la cella cliccata sia una bomba oppure no. Se non lo è posso continuare a giocare e il mio punteggio aumenta di uno (scoreCounter++), mentre alla prima bomba che viene cliccata il gioco si interrompe e viene visualizzato un messaggio che comunica il punteggio totalizzato.
  sq.addEventListener('click', function(event){ 
    //se il giocatore riesce a finire il gioco, stampo l'output del messaggio di vittoria

    //ridondante?
    if (chosenDifficulty === 1) squareNumber = 100;
    else if (chosenDifficulty === 2) squareNumber = 81;
    else squareNumber = 49;

   // console.log(squareNumber);

    if (
      (chosenDifficulty === 1 && scoreCounter === (squareNumber - BOMBS_NUMBER -1)) || 
      (chosenDifficulty === 2 && scoreCounter === (squareNumber - BOMBS_NUMBER -1)) ||
      (chosenDifficulty === 3 && scoreCounter === (squareNumber - BOMBS_NUMBER -1))
    ) {
      sq.classList.add('safe');
      endMessage.innerHTML = `Complimenti, hai vinto!`;
      endMessage.style.display='block';
      grid.append(endMessage);
      endGame();
      result=true;
    }

    if (!bombs.includes(parseInt(this.innerText)) && result===false) {
      if(!sq.classList.contains('safe')) scoreCounter++;
      sq.classList.add('safe');
    }
    else if (bombs.includes(parseInt(this.innerText)) && result===false) {
      sq.classList.add('bomb');
      result=true;
      endMessage.innerHTML = `Mi dispiace! Hai perso. Hai azzeccato ${scoreCounter} tentativi.`;
      endMessage.style.display='block';
      grid.append(endMessage);
      console.log(grid);
      endGame();
    }
  });

  target.append(sq);
  return sq;
}


//funzione che genera e restituisce numero intero random compreso tra minimo e massimo passati come parametri
function getRandomInt(min,max) {
  return Math.floor(Math.random()*(max - min + 1) + min);
}


//funzione che genera le bombe in base ai quadrati contenuti nella griglia (e di conseguenza in base alla difficoltà scelta)
function generateBombs(sqNumb) {
  for (let i=0; i<BOMBS_NUMBER; i++) {
    let bomb = getRandomInt(1,sqNumb);
    if (!bombs.includes(bomb)) bombs.push(bomb);
    else i--;
 }
}


function endGame() {
//  console.log('siamo dentro end game');
  let squareList = document.querySelectorAll('.square');
  for (let i=0; i<squareList.length; i++){
    //console.log(i);
    let singleSquare = parseInt(squareList[i].innerText);
    if (bombs.includes(parseInt(singleSquare))) squareList[i].classList.add('bomb');
  }
}