const ticTacToe = (() => {

    const gameBoard = {board: [["", "", ""], ["", "", ""], ["", "", ""]]};
    const {board} = gameBoard;
    let difficulty = "easy";

    const isMovesLeft = (board) => {
        for(let row = 0; row < 3; row++) {
            for(let col = 0; col < 3; col++) {
                if(board[row][col] === "") {
                    return true;
                }
            }
        }
        return false;
    }

    const findBestMove = (board) => {
        let bestScore = -Infinity;
        let bestMove;
        for(let row = 0; row < 3; row++) {
            for(let col = 0; col < 3; col++) {
                if(board[row][col] === ""){
                    board[row][col] = "X";
                    let score = minimax(board, 0, false);
                    board[row][col] = "";

                    // Update the best score.
                    if(score > bestScore) {
                        bestScore = score;
                        bestMove = {row, col};
                    }
                }
            }
        }
        return bestMove;
    }

    const minimax = (board, depth, isMaxPlayer) => {
        let results = evaluateBoard(board);
        if(results === 1 || results === -1) {
            return results;
        }
        if(isMovesLeft(board) === false) {
            return  0;
        }

        if(isMaxPlayer) {
            let bestVal = -Infinity;

            for(let row = 0; row < 3; row++) {
                for(let col = 0; col < 3; col++) {
                    if(board[row][col] === ""){
                        board[row][col] = "X";
                        bestVal = Math.max(bestVal, minimax(board, depth + 1, false));
                        board[row][col] = "";
                    }
                }
            }
            return bestVal;
        }
        else {
            let bestVal = Infinity;

            for(let row = 0; row < 3; row++) {
                for(let col = 0; col < 3; col++) {
                    if(board[row][col] == ""){
                        board[row][col] = "O";
                        bestVal = Math.min (bestVal, minimax(board, depth + 1, true));
                        board[row][col] = "";
                    }
                }
            }
            return bestVal;
        }
    }

    const restartGame = () => {
        // Reset array
        for(let row = 0; row < 3; row++) {
            for(let col = 0; col < 3; col++) {
                board[row][col] = "";
            }
        }
    
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

        // Create listener for changing difficulty of AI.
        const aiDifficulty = document.querySelector('#ai-difficulty');
        aiDifficulty.addEventListener('change', (e) => changeDifficulty(e));
    }

    const evaluateBoard = (board) => {

        // Rows
        for(let r = 0; r < 3; r++) {
            if(board[r][0] === board[r][1] && board[r][1] === board[r][2] && board[r][0] !== "") {
                if(board[r][0] === "X") {
                    return 1;
                }
                else {
                    return -1;
                }
            }
        }     
        
        // Columns
        for(let c = 0; c < 3; c++) {
            if(board[0][c] === board[1][c] && board[1][c] === board[2][c] && board[0][c] !== "") {
                if(board[0][c] === "X") {
                    return 1;
                }
                else {
                    return -1;
                }
            }
        }       
        
        // Diagonals
        if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
            if(board[0][0] === "X") {
                return 1;
            }
            else {
                return -1;
            }
        }
        if(board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
            if(board[0][2] === "X") {
                return 1;
            }
            else {
                return -1;
            }
        }

        return 0;
    }

    const disableButton = () => {
        const buttons = document.querySelectorAll('.board button');
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    const checkWinner = (board) => {

        const winnerMessage = document.querySelector('.winner-msg');

        if(isMovesLeft(board) === false) {
            winnerMessage.textContent = "Draw!";
            disableButton();
        }

        // Rows
        for(let r = 0; r < 3; r++) {
            if(board[r][0] === board[r][1] && board[r][1] === board[r][2] && board[r][0] !== "") {
                winnerMessage.textContent = `${board[r][0]} is the Winner!`;
                disableButton();
            }
        }     
        
        // Columns
        for(let c = 0; c < 3; c++) {
            if(board[0][c] === board[1][c] && board[1][c] === board[2][c] && board[0][c] !== "") {
                winnerMessage.textContent = `${board[0][c]} is the Winner!`;
                disableButton();
            }
        }       
        
        // Diagonals
        if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
            winnerMessage.textContent = `${board[0][0]} is the Winner!`;
            disableButton();
        }
        if(board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
            winnerMessage.textContent = `${board[0][2]} is the Winner!`;
            disableButton();
        }
    }

    const changeDifficulty = (e) => {
        restartGame();
        difficulty = e.target.value;
    }

    const playGame = (e) => {
        if(e.target.textContent === "") {
            // Player Move
            e.target.textContent = "O";
            const row = e.target.dataset.key.charAt(0);
            const col = e.target.dataset.key.charAt(1);
            board[row][col] = "O";

            checkWinner(board);
        
            // Computer Move using minimax algorithm
            if(isMovesLeft(board) === true && e.target.disabled === false) {

                if(difficulty === "easy") {
                    let randomRow = 0;
                    let randomCol = 0;
                    do {
                        randomRow = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
                        randomCol = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
                    } while (board[randomRow][randomCol] !== "" && (board[randomRow][randomCol] === "X" || board[randomRow][randomCol] === "O"))
        
                    document.querySelector(`button[data-key="${randomRow}${randomCol}"]`).textContent = "X";
                    board[randomRow][randomCol] = "X";            
        
                    checkWinner(board);             
                }
                else if(difficulty === "impossible") {
                    const bestMove = findBestMove(board);
                    document.querySelector(`button[data-key="${bestMove.row}${bestMove.col}"]`).textContent = "X";
                    board[bestMove.row][bestMove.col] = "X";           

                    checkWinner(board);       
                }
            }
        }
    }

    return {startGame};
});

const tictactoe = ticTacToe();
tictactoe.startGame();