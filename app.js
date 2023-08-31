
const gameboard = function(){
   const gameArray = ["","","","","","","","",""];
   const winCombinations = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8]
   ]

   let xWon = false;
   let oWon = false; 
   const winner = document.querySelector(".winner")
   const container = document.querySelector(".container");
   const restart = document.querySelector(".restart")
   const p1 = document.querySelector(".p1")
   const p2 = document.querySelector(".p2")

   const players = (name, icon) => {
    return {name,icon}
   }
   const player1 = players(p1.value, "X")
   const player2 = players(p2.value, "O")

   let currentPlayer = player1;

   function switchPlayer() {
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
  }


   function checkWin(){
      
   for (let combination of winCombinations){
      const [a,b,c] = combination;
      if (gameArray[a] === "X" && gameArray[b] === "X" && gameArray[c] === "X") {
         xWon = true;
         stopGame() 
         restart.style.display = "unset"
     }
   
      if (gameArray[a] === "O" && gameArray[b] === "O" && gameArray[c] === "O") {
         oWon = true;
         stopGame() 
         restart.style.display = "unset"
      }   
}
      
      if (xWon){
         winner.textContent = `${player1.name} Won!`
         if (!player1.name){
            winner.textContent = "X Won!"
         }
      }else if(oWon){
         winner.textContent = `${player2.name} Won!`
         if (!player2.name){
            winner.textContent = "O Won!"
         }
      }

   }

   function stopGame() {
      const boxes = document.querySelectorAll(".box");
      boxes.forEach(box => box.removeEventListener("click", boxClickHandler));
    }
  
    function boxClickHandler() {
      const box = this;
      if (box.textContent === "") {
        const textSpan = document.createElement("span")
        textSpan.textContent = currentPlayer.icon;
        box.appendChild(textSpan)
        gameArray[box.dataset.index] = currentPlayer.icon;
        switchPlayer();
        checkWin();
        draw()
      }
    }
  
    function displaygame() {
  
      for (let i = 0; i < 9; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.dataset.index = i; // Store the index of the box
        container.appendChild(box);
  
        box.addEventListener("click", boxClickHandler);
      }
    }

    function draw(){
      if (!gameArray.includes("")){
         winner.textContent = "Its a Draw!"
         restart.style.display = "unset"
      }
    }

    restartGame()

   
   
return displaygame()
}




function restartGame(){
   const restart = document.querySelector(".restart")
   const winner = document.querySelector(".winner")
   restart.addEventListener("click", function(){
      const container = document.querySelectorAll(".container")
      container.forEach(c => {
         c.textContent = ""
      })
      winner.textContent = ""
      restart.style.display = "none"
      gameboard()
   })
 }


const start = document.querySelector(".start")
const form = document.querySelector(".form")
start.addEventListener("click", function(){
   form.style.display = "none"
   gameboard()
})


 


 




