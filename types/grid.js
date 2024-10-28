
export default class Grid {
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => new Array(cols).fill(null));
    }

    checkInput(row, col){
        if (row >= this.rows || col >= this.cols) return false
        else return true
    }

    destructAugs(rowOrObj, colOrUndefined){
        let row, col;
        if (typeof rowOrObj == 'object'){
            ({row, col} = rowOrObj)
        } else {
            row = rowOrObj;
            col = colOrUndefined;
        }
        if(!this.checkInput(row, col)) return undefined;

        return {row, col}
    }

    dump() {
        let rowStr = '';
        for (let row = 0; row < this.rows; row++) {
            let colStr = '';
            for (let col = 0; col < this.cols; col++) {
                colStr += this.data[row][col] + ' ';
            }
           
            rowStr += colStr + "\n"
        }
        return rowStr;
    }

    set(rowOrObj, colOrValue, valueOrUndefined){
        let row, col, value;
        if (typeof rowOrObj === 'object'){
            ({row, col} = rowOrObj)
            value = colOrValue
        } else {
            row = rowOrObj;
            col = colOrValue;
            value = valueOrUndefined;
        }
        if(!this.checkInput(row, col)) return undefined;
        
        return this.data[row][col] = value;
    }

    get(rowOrObj, colOrUndefined){
        const args = this.destructAugs(rowOrObj, colOrUndefined);
        if (!args) return undefined;
        const { row, col } = args;

        return this.data[row][col];
    }

    indexFor(rowOrObj, colOrUndefined){
        const args = this.destructAugs(rowOrObj, colOrUndefined);
        if (!args) return undefined;
        const { row, col } = args;
        
        return (row*this.cols) + col;
    }

    rowColFor(index){
        const row = Math.floor( index / this.cols)
        const col = index % this.cols
        return {row,col}
    }

    neighbours(rowOrObj, colOrUndefined){
        const args = this.destructAugs(rowOrObj, colOrUndefined);
        if (!args) return undefined;
        const { row, col } = args;
        
        let neighbourArr = []
        for(let rowI = -1; rowI <= 1; rowI++){
            for (let colZ = -1; colZ <= 1; colZ++){
                let newRow = row + rowI;
                let newCol = col + colZ;
                if (newRow < 0 || newRow >= this.rows || newCol < 0 || newCol >= this.cols || (rowI === 0 && colZ === 0)) console.log(`Skipping: {${newRow},${newCol}}`);
                else neighbourArr.push({row: newRow, col: newCol})
                
            }
        }
        return neighbourArr;
    }

    neighbourValues(rowOrObj, colOrUndefined){
        let neighbourArr = this.neighbours(rowOrObj,colOrUndefined)
        let neighbourArrWithValues = []
        neighbourArr.forEach(obj => neighbourArrWithValues.push({...obj, value: this.get(obj)}))
        return neighbourArrWithValues
    }

    nextInRow(rowOrObj, colOrUndefined){
        const args = this.destructAugs(rowOrObj, colOrUndefined);
        if (!args) return undefined;
        const { row, col } = args;

        //Kinda hader logikken bag det her
        if (col +1 >= this.cols) return undefined
        return this.get({row: row, col: col +1})
    }

    nextInCol(rowOrObj, colOrUndefined){
        const args = this.destructAugs(rowOrObj, colOrUndefined);
        if (!args) return undefined;
        const { row, col } = args;

  
        if (row +1 >= this.rows) return undefined
        return this.get({row: row +1, col: col})
    }

    north(rowOrObj, colOrUndefined){
        const args = this.destructAugs(rowOrObj, colOrUndefined);
        if (!args) return undefined;
        const { row, col } = args;

        if (row - 1 < 0) return undefined
        else return this.get({row: row-1, col: col})
    }

    south(rowOrObj, colOrUndefined){
        const args = this.destructAugs(rowOrObj, colOrUndefined);
        if (!args) return undefined;
        const { row, col } = args;

        if (row +1 >= this.rows) return undefined
        else return this.get({row: row+1, col: col})
    }

    west(rowOrObj, colOrUndefined){
        const args = this.destructAugs(rowOrObj, colOrUndefined);
        if (!args) return undefined;
        const { row, col } = args;

        if (col -1 > 0) return undefined
        else return this.get({row: row, col: col-1})
    }

    east(rowOrObj, colOrUndefined){
        const args = this.destructAugs(rowOrObj, colOrUndefined);
        if (!args) return undefined;
        const { row, col } = args;

        if (col +1 >= this.cols) return undefined
        else return this.get({row: row, col: col+1})
    }

    getRows(){
        return this.rows
    }

    getCols(){
        return this.cols
    }

    size(){
        return (this.rows * this.cols) 
    }

    fill(value){
        this.data.forEach( arr => arr.fill(value))
    }


}
