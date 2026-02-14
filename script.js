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

  const printBoard = () => {
    let display = board.slice(0, 3).join(' | ') + '\n';
    display += board.slice(3, 6).join(' | ') + '\n';
    display += board.slice(6, 9).join(' | ');
    console.log(display);
  };

  const checkWin = (mark) => {
    return winningConditions.some((condition) => {
      return condition.every((index) => board[index] === mark);
    });
  };

  const checkTie = () => {
    return board.every((square) => square !== '');
  };

  return { getBoard, markSquare, printBoard, checkWin, checkTie };
}

function gameController(
  playerOneName = 'Player 1',
  playerTwoName = 'Player 2',
) {
  const board = Gameboard();

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
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${activePlayer.name}'s turn (${activePlayer.mark})`);
  };

  const getUserInput = () => {
    const input = prompt('Enter a number (0-8) to mark your square:');
    const index = parseInt(input);
    if (isNaN(index) || index < 0 || index > 8) {
      console.log('Invalid input. Please enter a number between 0 and 8.');
      return getUserInput();
    }
    return index;
  };

  const playRound = () => {
    const index = getUserInput();
    if (board.markSquare(index, activePlayer.mark)) {
      if (board.checkWin(activePlayer.mark)) {
        console.log(`${activePlayer.name} wins!`);
        board.printBoard();
        return;
      } else if (board.checkTie()) {
        console.log("It's a tie!");
        board.printBoard();
        return;
      }
      switchPlayerTurn();
      printNewRound();
      playRound();
    } else {
      console.log('Square already marked. Try again.');
      playRound();
    }
  };

  printNewRound();
  playRound();

  return { playRound, getActivePlayer };
}

const game = gameController();
