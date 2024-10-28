import * as controller from "./controller.js"
export function init(){
    document.getElementById("stepButton").addEventListener("click", function() {
        console.log("Step button clicked");
        controller.stepOnce()
        // Add your logic to start the maze solver here
    });
}

export function createHtmlMaze(maze) {
    console.log("Creating Maze");
    
    let mazeHtml = document.getElementById("maze");
    mazeHtml.innerHTML = "";
    for (let row = 0; row < maze.rows; row++) {
        for (let col = 0; col < maze.cols; col++) {
            let cell = maze.maze[row][col];
            let cellHtml = document.createElement("div");
            cellHtml.classList.add("cell");
            cellHtml.id = "cell-" + row + "-" + col;
            if (cell.north) {
                cellHtml.classList.add("north");
            }
            if (cell.east) {
                cellHtml.classList.add("east");
            }
            if (cell.south) {
                cellHtml.classList.add("south");
            }
            if (cell.west) {
                cellHtml.classList.add("west");
            }
            mazeHtml.appendChild(cellHtml);
        }
    }
    
}

export function markVisited(row, col){
    let cellHtml = document.getElementById("cell-" + row + "-" + col);
    if (cellHtml) {
        cellHtml.classList.add("visited");
    }
}