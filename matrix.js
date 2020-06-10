
const matrix = [
	[1,2,3,4],
	[1,'#','#',1],
	[1,1,1,'#'],
	[1,1,1,1]
];

// assuming if it is square matrix
const matrixLength = matrix.length;

// empty row queue and column queue
let xQueue = [], 
    yQueue = [];

//track the numbers of steps taken
let countSteps = 0;
let nodesLeftToCheck = 1;
let nextLayerNodes = 0;

// set same size matrix with false default values to track visited nodes
const visited = [];
for(let i = 0; i < matrixLength; i++) {
	visited.push([])
	for(let j = 0; j < 4; j++) {
		visited[i].push(false)
	}
}

// top, right, left, bottom direction coordinates
let directionX = [-1, +1, 0, 0,];
let directionY = [0, 0, +1, -1];

const findPath = (startCoordinate, endCoordinate) => {
	const startX = startCoordinate[0],
		    startY = startCoordinate[1],
	 	    endX = endCoordinate[0],
	 	    endY = endCoordinate[1]
	
	xQueue = [startX, ...xQueue];
	yQueue = [startY, ...yQueue];
	visited[startX][startY] = true; // mark starting cell
	while(xQueue.length > 0) {
		let x = xQueue.shift();
		let y = yQueue.shift();
		console.log(x, y)
		// end if coordinates are equal
		if(x === endX && y === endY) {
			return countSteps;
			break;
		}
		exploreNeighbours(x, y);
		nodesLeftToCheck--;
		if(nodesLeftToCheck === 0) {
			nodesLeftToCheck = nextLayerNodes;
			nextLayerNodes = 0;
			countSteps++;
		}
	}
	return false;
}

const exploreNeighbours = (x, y) => {
	let xx, yy;

	for(let i = 0; i < matrixLength; i++) {
		xx = x + directionX[i];
		yy = y + directionY[i];

		if(xx < 0 || yy < 0) continue;
		if(xx >= matrixLength || yy >= matrixLength) continue;
		if(visited[xx][yy] || matrix[xx][yy] == '#') continue;

		xQueue.push(xx);
		yQueue.push(yy);
		visited[xx][yy] = true;
		nextLayerNodes++;
	}
}

console.log(findPath([2, 0], [3, 3]))
