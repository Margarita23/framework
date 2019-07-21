import { Rgb } from "./rgb";

export class Control {
    protected controlType: string = "Control";
    public controls: Control[] = [];
    private _x: number = 0;
    private _y: number = 0;
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

    public pX: number = 0;
    public pY: number = 0;
    public pW: number = this.width;
    public pH: number = this.height;
    public click: (control: Control) => void;
    public mouseup: (constrol: Control) => void;
    public mousedown: (control: Control) => void;
    public mousemove: (control: Control) => void;
    public mouseleave: (control: Control) => void;
    public mouseover: (control: Control) => void;

    public draw(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx;
    }

    get x():number { return this._x }
    set x(newX: number) { this._x = newX < 0 ? 0 : newX; }

    get y():number { return this._y }
    set y(newY: number) { this._y = newY < 0 ? 0 : newY; }

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
        this.pW = (this.x + this.width) > newParent.width ? (newParent.width - this.x) : this.width;
        this.pH = (this.y + this.height) > newParent.height ? (newParent.height - this.y) : this.height;
        this._parent.controls.push(this);
    }

    public getControlType(): string{
        return this.controlType;
    }
}