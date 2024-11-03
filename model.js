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
  "goal": {"row": 2, "col": 1},
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
    if (!cell || typeof cell.row === 'undefined' || typeof cell.col === 'undefined') {
        console.error("Invalid cell:", cell);
        return choices;
    }


    directions.forEach(direction =>{ if(!maze.maze[cell.row][cell.col][direction] && direction != fromDirection ){ choices.push(direction)}})
    // console.log("Choices: ", choices);
    
    return choices
}

function walkOnce() {
    const currentCell = visitedStack.peek()
    if (currentCell.choices == undefined) currentCell.choices = cellToChoices(currentCell)

    
    if (currentCell.choices.length == 0){
        console.log("popping the stack");
        visitedStack.pop()
        console.log("Stack after pop: ");
        visitedStack.dump()
        walkOnce()
    } 
    directions.forEach(direction => {
        if (currentCell.choices){
        if (direction == currentCell.choices[0]) {
            const nextCell = visitedGrid.get(currentCell.row + directionToRowCol[direction][0], currentCell.col + directionToRowCol[direction][1])
            if (nextCell == 1) {
                // console.log("Already visited: ", nextCell);
                currentCell.choices.shift()
                walkOnce()
                return
            }
            move(direction)
            return
        }
    }
    })
    
    return visitedStack.toList()
}

function pushCellToStack(row, col){
    let cell = maze.maze[row][col]
    let choices = cellToChoices(cell).forEach(choice => {if (choice != fromDirection) return choice})
    visitedStack.push({row: cell.row, col: cell.col, choices: choices})
    visitedGrid.set(row, col, 1)
    return cell;
}

function move(direction){
    const currentCell = visitedStack.peek()
    let cell;
    // console.log("from: ", currentCell.row, currentCell.col);
    
    
    switch (direction) {
        case "south":
            fromDirection = "north"
            removeDirecFromTopCell("south")
            // console.log("Attempting to move south to: ", currentCell.row + 1, currentCell.col);
            cell = pushCellToStack(currentCell.row + 1, currentCell.col)
            
            return cell
        case "north":
            fromDirection = "south"
            removeDirecFromTopCell("north")
            // console.log("Attempting to move north to: ", currentCell.row - 1, currentCell.col);
            cell = pushCellToStack(currentCell.row - 1, currentCell.col)
            
            return cell
        case "east":
            fromDirection = "west"
            removeDirecFromTopCell("east")
            // console.log("Attempting to move east to: ", currentCell.row, currentCell.col + 1);
            cell = pushCellToStack(currentCell.row, currentCell.col + 1)
    
            return cell
        case "west":
            fromDirection = "east"
            removeDirecFromTopCell("west")
            // console.log("Attempting to move west to: ", currentCell.row, currentCell.col - 1);
            cell = pushCellToStack(currentCell.row, currentCell.col - 1)

            return cell
        default:
            break;
    }
}

function removeDirecFromTopCell(direction){
    const currentCell = visitedStack.pop()
    let newChoices = currentCell.choices.forEach(choice => {if (choice != direction) return choice})
    currentCell.choices = newChoices
    visitedStack.push(currentCell)
    return currentCell
}

function checkForGoal(row, col){
    return row == maze.goal.row && col == maze.goal.col
}


export {maze, goToStart, walkOnce, init}