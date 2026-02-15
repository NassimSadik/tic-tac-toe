function Gameboard() {
  let board = ['', '', '', '', '', '', '', '', ''];

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getBoard = () => board;

  const markSquare = (index, mark) => {
    if (board[index] === '') {
      board[index] = mark;
      return true;
    }
    return false;
  };

  const checkWin = (mark) => {
    return winningConditions.some((condition) => {
      return condition.every((index) => board[index] === mark);
    });
  };

  const checkTie = () => {
    return board.every((square) => square !== '');
  };

  const gameOver = () => {
    return checkWin('X') || checkWin('O') || checkTie();
  };

  return { getBoard, markSquare, checkWin, checkTie, gameOver };
}

function gameController(
  playerOneName = 'Player 1',
  playerTwoName = 'Player 2',
) {
  const board = Gameboard();
  const playerTurnDiv = document.querySelector('.turn');

  playerTurnDiv.textContent = `${playerOneName}'s turn (X)`;

  const players = [
    {
      name: playerOneName,
      mark: 'X',
    },
    {
      name: playerTwoName,
      mark: 'O',
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    playerTurnDiv.textContent = `${activePlayer.name}'s turn (${activePlayer.mark})`;
  };

  const playRound = (index) => {
    if (board.markSquare(index, activePlayer.mark)) {
      if (board.checkWin(activePlayer.mark)) {
        playerTurnDiv.textContent = `${activePlayer.name} wins!`;
        return;
      } else if (board.checkTie()) {
        playerTurnDiv.textContent = "It's a tie!";
        return;
      }
      switchPlayerTurn();
    }
  };

  return { playRound, getBoard: board.getBoard, gameOver: board.gameOver };
}

function screenController() {
  const game = gameController();
  const boardContainer = document.querySelector('.container');

  const updateScreen = () => {
    boardContainer.textContent = '';

    const board = game.getBoard();
    board.forEach((square, index) => {
      const squareElement = document.createElement('div');
      squareElement.classList.add('square');
      squareElement.textContent = square;
      squareElement.addEventListener('click', () => {
        if (square === '' && !game.gameOver()) {
          game.playRound(index);
          updateScreen();
        }
      });

      boardContainer.appendChild(squareElement);
    });
  };

  updateScreen();
}

screenController();
