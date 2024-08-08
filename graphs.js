
function makeDegreeMatrix(adjacencyMatrix) {
    let mat = [];
    for(let i = 0; i < adjacencyMatrix.length; i++) {
        let row = [];
        for(let j = 0; j < adjacencyMatrix.length; j++) {
            if(j == i) {
                let sum = 0;
                adjacencyMatrix[i].forEach(entry => sum += entry);
                row.push(sum);
            }
            else {
                row.push(0);
            }
        }
        mat.push(row);
    }
    return mat;
}

function makeLaplacian(adjacencyMatrix, degreeMatrix) {
    let mat = [];
    for(let i = 0; i < adjacencyMatrix.length; i++) {
        let row = [];
        for(let j = 0; j < adjacencyMatrix.length; j++) {
            row.push(degreeMatrix[i][j] - adjacencyMatrix[i][j]);
        }
        mat.push(row);
    }
    return mat;
}

function getPrescribedGraphEmbedding(matrix) {
    const ADJ = matrix;
    const DEG = makeDegreeMatrix(ADJ);
    const LAP = makeLaplacian(ADJ, DEG);
    const EIGENS = math.eigs(LAP, {precision:1e-12});
    const X = EIGENS.eigenvectors[1].vector;
    const Y = EIGENS.eigenvectors[2].vector;
    const Z = EIGENS.eigenvectors[3].vector;
    return {
        "Order" : ADJ.length,
        "Adjacency" : ADJ,
        "Degree" : DEG,
        "Laplacian" : LAP,
        "Eigenvalues" : EIGENS,
        "EV1" : X,
        "EV2" : Y,
        "EV3" : Z
    };
}