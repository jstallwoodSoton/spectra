function get3DGraphSketch(matrix, increment, index) {
    return (p) => {
        //Graph Data
        const GRAPH = getPrescribedGraphEmbedding(matrix);
        const ORDER = GRAPH["Order"];
        const ADJ = GRAPH["Adjacency"];
        const X = GRAPH["EV1"];
        const Y = GRAPH["EV2"];
        const Z = GRAPH["EV3"];

        console.log("3D Graph " + index.toString());
        console.log(GRAPH);

        const INCREMENT = increment;

        const TINT = createRandomColor(255, 255, 255);
        const COLOR_ONE_HEX = createRandomColor(TINT[0], TINT[1], TINT[2]);
        const COLOR_TWO_HEX = createRandomColor(TINT[0], TINT[1], TINT[2]);
        const COLOR_THREE_HEX = createRandomColor(TINT[0], TINT[1], TINT[2]);

        //Window Data
        const WIDTH = window.innerWidth/4;
        const HEIGHT = window.innerWidth/4;
        const MIN_WIDTH = -WIDTH/2;
        const MAX_WIDTH = WIDTH/2;
        const MIN_HEIGHT = -HEIGHT/2;
        const MAX_HEIGHT = HEIGHT/2;

        //Node Setup
        let nodes = [];
        for(let i = 0; i < ORDER; i++) {
            nodes.push(
                new GraphNode3D(
                    MIN_WIDTH + (Math.random() * (MAX_WIDTH - MIN_WIDTH)),
                    MIN_HEIGHT + (Math.random() * (MAX_HEIGHT - MIN_HEIGHT)),
                    MIN_WIDTH + (Math.random() * (MAX_WIDTH - MIN_WIDTH)),
                    MAX_WIDTH * X[i],
                    MAX_WIDTH * Y[i],
                    MAX_WIDTH * Z[i]
                )
            );
        }

        let counter = 0;

        p.setup = function() {
            p.createCanvas(WIDTH, HEIGHT, p.WEBGL);
        };

        p.draw = function() {

            p.background(COLOR_ONE_HEX);
            p.orbitControl();

            //Draw Nodes
            nodes.forEach(node => {
                p.strokeWeight(10);
                p.stroke(COLOR_THREE_HEX);
                p.point(node.x, node.y, node.z);
            });

            //Draw Edges
            p.strokeWeight(2);
            for(let i =0; i < ORDER; i++) {
                for(let j = i; j < ORDER; j++) {
                    if(ADJ[i][j] > 0) {
                        p.line(
                            nodes[i].x,
                            nodes[i].y,
                            nodes[i].z,
                            nodes[j].x,
                            nodes[j].y,
                            nodes[j].z
                        );
                    }
                }
            }

            //Move Nodes
            if(counter < 1) {
                nodes.forEach(node => {
                    node.moveToEnd(counter);
                });
                counter += INCREMENT;
            }
        }
    }
}

function get2DGraphPainting(matrix, increment, index) {
    return (p) => {
        //Graph Data
        const GRAPH = getPrescribedGraphEmbedding(matrix);
        const ORDER = GRAPH["Order"];
        const ADJ = GRAPH["Adjacency"];
        const X = GRAPH["EV1"];
        const Y = GRAPH["EV2"];

        console.log("2D Graph Painting " + index.toString());
        console.log(GRAPH);

        const INCREMENT = increment;

        const TINT = createRandomColor(255, 255, 255);
        const COLOR_ONE_HEX = createRandomColor(TINT[0], TINT[1], TINT[2]);
        const COLOR_TWO_HEX = createRandomColor(TINT[0], TINT[1], TINT[2]);
        const COLOR_THREE_HEX = createRandomColor(TINT[0], TINT[1], TINT[2]);

        //Window Data
        const WIDTH = window.innerWidth/4;
        const HEIGHT = window.innerWidth/4;
        const MIN_WIDTH = 0.1 * WIDTH;
        const MAX_WIDTH = 0.9 * WIDTH;
        const MIN_HEIGHT = 0.1 * HEIGHT;
        const MAX_HEIGHT = 0.9 * HEIGHT;
        const CENTERX = WIDTH/2;
        const CENTERY = HEIGHT/2;

        //Node Setup
        let nodes = [];
        for(let i = 0; i < ORDER; i++) {
            nodes.push(
                new GraphNode2D(
                    MIN_WIDTH + (Math.random() * (MAX_WIDTH - MIN_WIDTH)),
                    MIN_HEIGHT + (Math.random() * (MAX_HEIGHT - MIN_HEIGHT)),
                    CENTERX + (CENTERX * X[i]),
                    CENTERY + (CENTERY * Y[i])
                )
            );
        }

        let counter = 0;

        p.setup = function() {
            p.createCanvas(WIDTH, HEIGHT);
            p.background(COLOR_ONE_HEX);
        };

        p.draw = function() {

            const col = p.lerpColor(
                p.color(COLOR_TWO_HEX),
                p.color(COLOR_THREE_HEX),
                counter
            );
            col.setAlpha(counter * 10);

            //Draw Edges
            p.stroke(col);
            p.strokeWeight(1);
            for(let i =0; i < ORDER; i++) {
                for(let j = i; j < ORDER; j++) {
                    if(ADJ[i][j] > 0) {
                        p.line(
                            nodes[i].x,
                            nodes[i].y,
                            nodes[j].x,
                            nodes[j].y
                        );
                    }
                }
            }

            //Move Nodes
            if(counter < 1) {
                nodes.forEach(node => {
                    node.moveToEnd(counter);
                });
                counter += INCREMENT;
            }
        }
    }
}

function makeRandomAdjacency(NUM_OF_NODES) {
    let RANDOM = [];
    for(let i = 0; i < NUM_OF_NODES; i++) {
        let row = [];
        for(let j = 0; j < NUM_OF_NODES; j++) {
            if(j < i) {
                row.push(RANDOM[j][i]);
            }
            else if(j == i) { 
                row.push(0);
            }
            else {
                row.push(
                    (Math.floor(Math.random() * 100) % 2 == 0) ? 1 : 0
                );
            }
        }
        RANDOM.push(row);
    }   
    return RANDOM;
}

for(let i = 0; i < 8; i++) {
    const NUM_OF_NODES = Math.floor(Math.random() * 20) + 4;
    const RANDOM = makeRandomAdjacency(NUM_OF_NODES);
    const sk = get2DGraphPainting(RANDOM, 0.001, (i + 1));
    new p5(sk, "sk" + (i + 1).toString());
}

for(let i = 0; i < 8; i++) {
    const NUM_OF_NODES = Math.floor(Math.random() * 20) + 4;
    const RANDOM = makeRandomAdjacency(NUM_OF_NODES);
    const sk = get3DGraphSketch(RANDOM, 0.01, (i + 1));
    new p5(sk, "ks" + (i + 1).toString());
}