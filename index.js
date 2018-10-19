const findCoordinateInMaze = require('./find-coordinate-in-maze.js');
const Point = require('./point.js')

const maze = [
    ['L', 'X', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'X', 'O'],
    ['O', 'O', 'X', 'O', 'O'],
    ['O', 'X', 'O', 'O', 'X'],
    ['O', 'X', 'O', 'O', 'P']
];

findIt();

function findIt() {
    const lCoordinate = findCoordinateInMaze(maze, 'L');
    const pCoordinate = findCoordinateInMaze(maze, 'P');

    let traverseMap = {};

    var competingPaths = [[lCoordinate]];

    let newCompetingPaths = [];
    let success = false;
    let stepsGained = true;

    while(success === false && stepsGained === true) {
        stepsGained = false;
        for(let competingPathIndex in competingPaths) {
            let competingPath = competingPaths[competingPathIndex];
            let currentSteps = getPossibleSteps(competingPath[competingPath.length-1], traverseMap);
            for(let currentStepIndex in currentSteps) {
                let currentStep = currentSteps[currentStepIndex];
                traverseMap[currentStep.x + ':' + currentStep.y] = true;
                let newCompetingPath = JSON.parse(JSON.stringify(competingPath));
                newCompetingPath.push(currentStep);
                if(JSON.stringify(pCoordinate) === JSON.stringify(currentStep)) {
                    success = true;
                    console.log("Winner Winner Chicken Dinner: " + JSON.stringify(newCompetingPath));
                    return true;
                } else if (maze[currentStep.y][currentStep.x] === 'O') {
                    stepsGained = true;
                    newCompetingPaths.push(newCompetingPath);
                }
            }
        }
        competingPaths = newCompetingPaths;
    }

    console.log("Womp Womp. No way through.")
}

function getPossibleSteps(coordinate, traverseMap) {
    let stepsArray = [];
    if(coordinate.x > 0 && !traverseMap[(coordinate.x-1) + ':' + coordinate.y]) {
        stepsArray.push(new Point(coordinate.x-1, coordinate.y));
    }

    if(coordinate.x < maze[0].length-1 && !traverseMap[(coordinate.x+1) + ':' + coordinate.y]) {
        stepsArray.push(new Point(coordinate.x+1, coordinate.y));
    }

    if(coordinate.y > 0 && !traverseMap[coordinate.x + ':' + (coordinate.y-1)]) {
        stepsArray.push(new Point(coordinate.x, coordinate.y-1));
    }

    if(coordinate.y < maze.length-1 && !traverseMap[coordinate.x + ':' + (coordinate.y+1)]) {
        stepsArray.push(new Point(coordinate.x, coordinate.y+1));
    }
    return stepsArray;
}
