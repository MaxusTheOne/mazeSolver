import * as view from './view.js';
import * as model from './model.js';
window.addEventListener("load", init)

view.createHtmlMaze(model.maze);

function init(){
    console.log("controller init");
    view.init()
    model.init()
    goToStart()
    
}

function goToStart(){
    const cell = model.goToStart()
    view.markVisited(cell.col, cell.row)

}

function stepOnce(){
    const cell = model.walkOnce()
    console.log(cell);
    
    view.markVisited(cell.row, cell.col)
}

window.stepOnce = stepOnce;
export {stepOnce}