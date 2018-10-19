const Point = require('./point.js')
//takes a maze: string[][] and character: string, returns a point {x:number, y:number}
module.exports = function findCoordinateInMaze(maze, character) {
    for(let yIndex= 0; yIndex < maze.length; yIndex++) {
        for(let xIndex=0; xIndex < maze[yIndex].length; xIndex++){
            if(maze[yIndex][xIndex] === character) {
                return new Point(xIndex, yIndex);
            }
        }
    }
}
