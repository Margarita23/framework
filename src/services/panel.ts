import { Control } from "./control";

export class Panel extends Control {

    constructor(x: number, y: number, width: number, height: number, parent: Control) {
        super(x, y, width, height, parent);
    }
}