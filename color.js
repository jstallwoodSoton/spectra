function createRandomColor(mixR, mixG, mixB) {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;

    return [
        (r + mixR)/2, (g + mixG)/2, (b + mixB)/2, 
    ];
}