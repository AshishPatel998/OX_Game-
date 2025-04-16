let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let gameActive = true;

function makeMove(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  document.getElementsByClassName('cell')[index].innerText = currentPlayer;

  if (checkWin()) return;

  currentPlayer = 'O';
  setTimeout(() => {
    computerMove();
  }, 500);
}

function computerMove() {
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  board[move] = 'O';
  document.getElementsByClassName('cell')[move].innerText = 'O';
  checkWin();
  currentPlayer = 'X';
}

function minimax(newBoard, depth, isMaximizing) {
  let scores = { 'O': 10, 'X': -10, 'tie': 0 };
  let result = evaluateBoard(newBoard);
  if (result !== null) return scores[result];

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = 'O';
        let score = minimax(newBoard, depth + 1, false);
        newBoard[i] = "";
        best = Math.max(score, best);
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = 'X';
        let score = minimax(newBoard, depth + 1, true);
        newBoard[i] = "";
        best = Math.min(score, best);
      }
    }
    return best;
  }
}

function evaluateBoard(b) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a, b1, c] = pattern;
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
      return b[a];
    }
  }

  if (!b.includes("")) return "tie";
  return null;
}

function checkWin() {
  let result = evaluateBoard(board);
  if (result) {
    document.getElementById('status').innerText = result === 'tie' ? "It's a Tie!" : `${result} Wins!`;
    gameActive = false;
    return true;
  }
  return false;
}
