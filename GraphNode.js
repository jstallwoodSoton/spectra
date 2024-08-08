class GraphNode3D {

    constructor(startX, startY, startZ, endX, endY, endZ) {
        this.startX = startX;
        this.startY = startY;
        this.startZ = startZ;
        this.endX = endX;
        this.endY = endY;
        this.endZ = endZ;
        this.x = startX;
        this.y = startY;
        this.z = startZ;
    }

    getUpdatePosition(counter) {
        return [
            this.startX + (this.endX - this.startX) * counter,
            this.startY + (this.endY - this.startY) * counter,
            this.startZ + (this.endZ - this.startZ) * counter
        ];
    }

    moveToEnd(counter) {
        const NEW_POSITIONS = this.getUpdatePosition(counter);
        this.x = NEW_POSITIONS[0];
        this.y = NEW_POSITIONS[1];
        this.z = NEW_POSITIONS[2];
    }
}

class GraphNode2D {

    constructor(startX, startY, endX, endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.x = startX;
        this.y = startY;
    }

    getUpdatePosition(counter) {
        return [
            this.startX + (this.endX - this.startX) * counter,
            this.startY + (this.endY - this.startY) * counter
        ];
    }

    moveToEnd(counter) {
        const NEW_POSITIONS = this.getUpdatePosition(counter);
        this.x = NEW_POSITIONS[0];
        this.y = NEW_POSITIONS[1];
    }
}