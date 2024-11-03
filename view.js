import * as controller from "./controller.js"
export function init(){
    document.getElementById("stepButton").addEventListener("click", function() {
        console.log("Step button clicked");
        controller.stepOnce()
    });
}

let lastPath = [];

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
            if (cell.row === maze.goal.row && cell.col === maze.goal.col) {
                cellHtml.classList.add("goal");
            }
            mazeHtml.appendChild(cellHtml);
        }
    }
    
}

export function changePath(newList){
    lastPath.forEach(cell => {
        let cellHtml = document.getElementById("cell-" + cell.row + "-" + cell.col);
        if (cellHtml) {
            cellHtml.classList.remove("path");
        }
    });
    newList.forEach(cell => {
        let cellHtml = document.getElementById("cell-" + cell.row + "-" + cell.col);
        if (cellHtml) {
            cellHtml.classList.add("path");
        }
    });
    lastPath = newList;
    return lastPath;
}

export function markVisited(row, col){
    let cellHtml = document.getElementById("cell-" + row + "-" + col);
    if (cellHtml) {
        cellHtml.classList.add("visited");
    }
}