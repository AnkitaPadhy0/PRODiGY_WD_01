const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(event) {
  const index = event.target.dataset.index;

  if (!gameState[index] && isGameActive) {
    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkResult();
    if (isGameActive) switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkResult() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      statusText.textContent = `🎉 Player ${gameState[a]} Wins!`;
      highlightWinners(combo);
      isGameActive = false;
      return;
    }
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw!";
    isGameActive = false;
  }
}

function highlightWinners(combo) {
  combo.forEach(index => {
    cells[index].classList.add("winner");
  });
}

function restartGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
statusText.textContent = `Player ${currentPlayer}'s turn`;
