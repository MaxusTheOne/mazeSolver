import Grid from './types/grid.js';
import Stack from './types/stack.js';

function init(){
    console.log("controller init");
    mazeToGrid(maze.maze)

    
}

const maze = {
  "rows": 4,
  "cols": 4,
  "start": {"row": 0, "col": 0},
  "goal": {"row": 2, "col": 3},
  "maze":
  [
    [{"row":0,"col":0,"north":true,"east":true,"west":true,"south":false},
     {"row":0,"col":1,"north":true,"east":false,"west":true,"south":false},
     {"row":0,"col":2,"north":true,"east":false,"west":false,"south":true},
     {"row":0,"col":3,"north":true,"east":true,"west":false,"south":false}],
    [{"row":1,"col":0,"north":false,"east":false,"west":true,"south":true},
     {"row":1,"col":1,"north":false,"east":true,"west":false,"south":true},
     {"row":1,"col":2,"north":true,"east":false,"west":true,"south":false},
     {"row":1,"col":3,"north":false,"east":true,"west":false,"south":true}],
    [{"row":2,"col":0,"north":true,"east":false,"west":true,"south":false},
     {"row":2,"col":1,"north":true,"east":true,"west":false,"south":true},
     {"row":2,"col":2,"north":false,"east":true,"west":true,"south":false},
     {"row":2,"col":3,"north":true,"east":true,"west":true,"south":false}],
    [{"row":3,"col":0,"north":false,"east":false,"west":true,"south":true},
     {"row":3,"col":1,"north":true,"east":false,"west":false,"south":true},
     {"row":3,"col":2,"north":false,"east":false,"west":false,"south":true},
     {"row":3,"col":3,"north":false,"east":true,"west":false,"south":true}]
  ]
}
const mazeGrid = new Grid(maze.rows, maze.cols)
const visitedGrid = new Grid(maze.rows, maze.cols)
const directions = ["east", "south", "west", "north"]
const directionToRowCol = {"east": [0, 1], "south": [1, 0], "west": [0, -1], "north": [-1, 0]}
let fromDirection = ""
const visitedStack = new Stack()

function goToStart() {
    let start = maze.start
    let choices = cellToChoices(start)
    visitedStack.push({row: start.row, col: start.row, choices: choices})
    visitedGrid.set(start.row, start.col, 1)
    return start
}

function mazeToGrid(maze){
    maze.forEach(row => row.forEach(cell => mazeGrid.set(cell.row, cell.col, cell)))
    return mazeGrid
}

function cellToChoices(cell){
    let choices = []
    directions.forEach(direction =>{ if(!maze.maze[cell.row][cell.col][direction] && visitedGrid.get(cell.row + directionToRowCol[direction][0], cell.col + directionToRowCol[direction][1]) != 1 ){ choices.push(direction)}})

    return choices
}

function walkOnce() {
    const currentCell = visitedStack.peek()
    directions.forEach(direction => {if(direction == currentCell.choices[0]){ 
        const nextCell = visitedGrid.get(currentCell.row + directionToRowCol[direction][0], currentCell.col + directionToRowCol[direction][1])
        if (visitedGrid.get(currentCell.row + directionToRowCol[direction][0], currentCell.col + directionToRowCol[direction][1]) == 1){
            console.log("Already visited: ", nextCell);
            currentCell.choices.shift()
            walkOnce()
        }
        move(direction)
    }})
    if (currentCell.choices.length == 0){
        visitedStack.pop()
        walkOnce()
    } 
    return visitedStack.peek()
}

function pushCellToStack(row, col){
    let cell = maze.maze[row][col]
    let choices = cellToChoices(cell)
    visitedStack.push({row: cell.row, col: cell.col, choices: choices})
    visitedGrid.set(row, col, 1)
    return cell;
}

function move(direction){
    const currentCell = visitedStack.peek()
    let cell;
    
    switch (direction) {
        case "south":
            fromDirection = "north"
            cell = pushCellToStack(currentCell.row + 1, currentCell.col)
            return cell
        case "north":
            fromDirection = "south"
            cell = pushCellToStack(currentCell.row - 1, currentCell.col)
            return cell
        case "east":
            fromDirection = "west"
            cell = pushCellToStack(currentCell.row, currentCell.col + 1)
            return cell
        case "west":
            fromDirection = "east"
            cell = pushCellToStack(currentCell.row, currentCell.col - 1)
            return cell
        default:
            break;
    }
}



export {maze, goToStart, walkOnce, init};