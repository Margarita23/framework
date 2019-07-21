import { Rgb } from "./rgb";

export class Control {
    protected controlType: string = "Control";
    public controls: Control[] = [];
    public x: number = 0;
    public y: number = 0;
    public width: number = 150;
    public height: number = 75;
    private _parent: Control = null;
    protected ctx: CanvasRenderingContext2D;
    public backgroundImage: HTMLImageElement = null;
    public backgroundColor: Rgb = new Rgb(200,200,200);
    public border: Rgb = new Rgb(0,0,0);
    public borderLineWidth: number = 1;
    public zOrder: number = 0;
    public name: string = "no name";
    public hover: boolean = false;

    public pX: number = 0;
    public pY: number = 0;
    public click: (control: Control) => void;
    public mouseup: (constrol: Control) => void;
    public mousedown: (control: Control) => void;
    public mousemove: (control: Control) => void;
    public mouseleave: (control: Control) => void;
    public mouseover: (control: Control) => void;

    public draw(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx;
    }

    get parent(): Control { return this._parent; }
    set parent(newParent) {
        this._parent = newParent;
        this.zOrder = newParent.zOrder + 1;

        let parent = newParent;
        while(parent){
            this.pX += parent.x;
            this.pY += parent.y;
            parent = parent.parent;
        }
        this._parent.controls.push(this);
    }

    public getControlType(): string{
        return this.controlType;
    }
}