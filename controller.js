import * as view from './view.js';
import * as model from './model.js';
window.addEventListener("load", init)

view.createHtmlMaze(model.maze);

function init(){
    console.log("controller init");
    model.init()
    view.init(model)
    goToStart()
    
}

function goToStart(){
    const cell = model.goToStart()
    view.markVisited(cell.col, cell.row)

}

function stepOnce(){
    const pathList = model.walkOnce()
    const cell = pathList[0]
    


    
    view.markVisited(cell.row, cell.col)
    view.changePath(pathList)
}

window.stepOnce = stepOnce;
export {stepOnce}