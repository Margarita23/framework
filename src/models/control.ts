import { Rgb } from "./rgb";
import { Input } from "./input";

export class Control {
    protected controlType: string = "Control";
    public controls: Control[] = [];
    public x: number = 0;
    public y: number = 0;
    public width: number = 150;
    public height: number = 75;
    private parent: Control = null;
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

    public draw(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx;
        //this.recalcPosition(this.x, this.y, this.width, this.height, this.parent);
    }

    public getControlType(): string{
        return this.controlType;
    }

    public setParent(parent: Control): void {
        this.parent = parent;
        this.zOrder = parent.zOrder + 1;
    }

    public recalcPosition(x: number, y: number, width: number, height: number, parent: Control): void{
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