import { View } from "../views/view";

export class Control{
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public parent: Control | View;

    constructor(x: number, y: number, width: number, height: number, parent?: Control){
        this.parent = parent;
        if(this.parent != null){
            this.x = this.parent.x + x;
            this.y = this.parent.y + y;
        }
        else{
            this.x = x;
            this.y = y;
        }
        this.width = width;
        this.height = height;
    }
}