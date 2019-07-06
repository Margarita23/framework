import { Rgb } from "./rgb";

export class Control {
    public controls: Control[] = [];
    public x: number = 0;
    public y: number = 0;
    public width: number = 100;
    public height: number = 50;
    public parent: Control = null;
    public ctx: CanvasRenderingContext2D;
    public backgroundImage: HTMLImageElement = null;
    public backgroundColor: Rgb = new Rgb(200,200,200);
    public border: Rgb = new Rgb(0,0,0);
    public borderLineWidth: number = 1;
    public zOrder: number;
    public click: () => void = () => {};
    public mouseup: () => void = () => {};
    public mousedown: () => void = () => {};
    public mousemove: () => void = () => {};

    constructor(zOrder: number, ctx: CanvasRenderingContext2D){
        //this.x = x;
        //this.y = y;
        //this.width = width;
        //this.height = height;
/*
        console.log(this);
        console.log("parent is -------");
        console.log(parent);
        console.log("is parent null????");
        console.log(!parent ? true : false );

        */

/*
        this.x = parent ? x + parent.x : x;
        this.y = parent ? y + parent.y : y;

        if(parent && (x + width) > parent.width) {
            this.width = parent.width - x;
            this.height = height;
        }
        else if(parent && (y + height) > parent.height) {
            this.height = parent.height - y;
            this.width = width;
        }
        else {
            this.width = width;
            this.height = height;
        }
*/
        this.zOrder = zOrder;
        this.ctx = ctx;
    }

    draw(): void {
        //this.recalcPosition(this.x, this.y, this.width, this.height, this.parent);
    }

    private recalcPosition(x: number, y: number, width: number, height: number, parent: Control): void{
        this.x = parent ? x + parent.x : x;
        this.y = parent ? y + parent.y : y;

        if(parent && (x + width) > parent.width) {
            this.width = parent.width - x;
            this.height = height;
        }
        else if(parent && (y + height) > parent.height) {
            this.height = parent.height - y;
            this.width = width;
        }
        else {
            this.width = width;
            this.height = height;
        }
    }
}