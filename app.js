const ticTacToe = (() => {

    const gameBoard = {board: [["", "", ""], ["", "", ""], ["", "", ""]]};
    const {board} = gameBoard;
    let turns = 0;

    const restartGame = () => {
        // Reset array
        for(let row = 0; row < 3; row++) {
            for(let col = 0; col < 3; col++) {
                board[row][col] = "";
            }
        }
    
        turns = 0;
    
        const buttons = document.querySelectorAll('.board button');
        buttons.forEach(button => {
            button.disabled = false;
            button.textContent = "";
        });
    
        const winnerMessage = document.querySelector('.winner-msg');
        winnerMessage.textContent = "";
    }

    const startGame = () => {
        // Display board.
        for(let row = 0; row < 3; row++) {
            for(let col = 0; col < 3; col++) {
                const button = document.createElement('button');
                button.textContent = board[row][col];
                button.dataset.key = `${row}${col}`;
                
                // Listen for click event.
                button.addEventListener('click', (e) => playGame(e));
    
                const boardContainer = document.querySelector('.board');
                boardContainer.appendChild(button);
            }
        }

        // Create listener for restart button.
        const restartBtn = document.querySelector('.restart-btn');
        restartBtn.addEventListener('click', restartGame);
    }

    const disableButton = () => {
        const buttons = document.querySelectorAll('.board button');
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    const checkWinner = (board) => {

        const winnerMessage = document.querySelector('.winner-msg');
    
        if(turns === 9) {
            winnerMessage.textContent = "Draw!";
            disableButton();
        }
        else {
            // Rows
            if(board[0][0] == "X" && board[0][1] == "X" && board[0][2] == "X"){
                winnerMessage.textContent = "X is the Winner!";
                disableButton();
            }
            else if(board[1][0] == "X" && board[1][1] == "X" && board[1][2] == "X") {
                winnerMessage.textContent = "X is the Winner!";
                disableButton();
            }
            else if(board[2][0] == "X" && board[2][1] == "X" && board[2][2] == "X") {
                winnerMessage.textContent = "X is the Winner!";
                disableButton();
            }
            else if(board[0][0] == "O" && board[0][1] == "O" && board[0][2] == "O"){
                winnerMessage.textContent = "O is the Winner!";
                disableButton();
            }
            else if(board[1][0] == "O" && board[1][1] == "O" && board[1][2] == "O") {
                winnerMessage.textContent = "O is the Winner!";
                disableButton();
            }
            else if(board[2][0] == "O" && board[2][1] == "O" && board[2][2] == "O") {
                winnerMessage.textContent = "O is the Winner!";
                disableButton();
            }
            // Columns
            else if(board[0][0] == "X" && board[1][0] == "X" && board[2][0] == "X"){
                winnerMessage.textContent = "X is the Winner!";
                disableButton();
            }
            else if(board[0][1] == "X" && board[1][1] == "X" && board[2][1] == "X") {
                winnerMessage.textContent = "X is the Winner!";
                disableButton();
            }
            else if(board[0][2] == "X" && board[1][2] == "X" && board[2][2] == "X") {
                winnerMessage.textContent = "X is the Winner!";
                disableButton();
            }
            else if(board[0][0] == "O" && board[1][0] == "O" && board[2][0] == "O"){
                winnerMessage.textContent = "O is the Winner!";
                disableButton();
            }
            else if(board[0][1] == "O" && board[1][1] == "O" && board[2][1] == "O") {
                winnerMessage.textContent = "O is the Winner!";
                disableButton();
            }
            else if(board[0][2] == "O" && board[1][2] == "O" && board[2][2] == "O") {
                winnerMessage.textContent = "O is the Winner!";
                disableButton();
            }    
            // Diagonals
            else if(board[0][0] == "X" && board[1][1] == "X" && board[2][2] == "X"){
                winnerMessage.textContent = "X is the Winner!";
                disableButton();
            }
            else if(board[0][2] == "X" && board[1][1] == "X" && board[2][0] == "X") {
                winnerMessage.textContent = "X is the Winner!";
                disableButton();
            }
            else if(board[0][0] == "O" && board[1][1] == "O" && board[2][2] == "O") {
                winnerMessage.textContent = "O is the Winner!";
                disableButton();
            }
            else if(board[0][2] == "O" && board[1][1] == "O" && board[2][0] == "O") {
                winnerMessage.textContent = "O is the Winner!";
                disableButton();
            }        
        }
    }

    const playGame = (e) => {
        if(e.target.textContent === "" && (e.target.textContent !== "X" || e.target.textContent !== "O")) {
            // Player Move
            e.target.textContent = "X";
            const row = e.target.dataset.key.charAt(0);
            const col = e.target.dataset.key.charAt(1);
            board[row][col] = "X";
            turns++;
    
            checkWinner(board);
    
            // Computer Move
            if(turns !== 9 && e.target.disabled !== true) { // Stops the computer from moving if there is a tie or winner.
                let randomRow = 0;
                let randomCol = 0;
                do {
                    randomRow = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
                    randomCol = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
                } while (board[randomRow][randomCol] !== "" && (board[randomRow][randomCol] === "X" || board[randomRow][randomCol] === "O") )
    
                document.querySelector(`button[data-key="${randomRow}${randomCol}"]`).textContent = "O";
                board[randomRow][randomCol] = "O";            
                turns++;
    
                checkWinner(board);
            }
        }
    }

    return {startGame};
});

const tictactoe = ticTacToe();
tictactoe.startGame();