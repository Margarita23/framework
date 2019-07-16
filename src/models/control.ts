import { Rgb } from "./rgb";

export class Control {
    protected controlType: string = "Control";
    public controls: Control[] = [];
    public x: number = 0;
    public y: number = 0;
    public width: number = 150;
    public height: number = 75;
    private _parent: Control = null;
    public ctx: CanvasRenderingContext2D;
    public backgroundImage: HTMLImageElement = null;
    public backgroundColor: Rgb = new Rgb(200,200,200);
    public border: Rgb = new Rgb(0,0,0);
    public borderLineWidth: number = 1;
    public zOrder: number = 0;
    //Убрать объявление пустой функции.
    public click: (control: Control) => void = () => {};
    public mouseup: () => void = () => {};
    public mousedown: () => void = () => {};
    public mousemove: () => void = () => {};

    public draw(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx;
        //console.log(this);

        this.x = this.parent ? this.x + this.parent.x : this.x;
        this.y = this.parent ? this.y + this.parent.y : this.y;
        if(this.parent && (this.x + this.width) > this.parent.x) {
            this.width = (this.parent.x + this.parent.width) - this.x;
            //this.width = (this.parent.x + this.parent.width) - this.x;
        }
        else if(this.parent && (this.y + this.height) > this.parent.y) {
            //this.height = (this.parent.y + this.parent.height) - this.y;
        }
    }

    get parent(): Control { return this._parent; }
    set parent(newParent) {
        this._parent = newParent;
        this._parent.controls.push(this);
        this.zOrder = newParent.zOrder + 1;
    }

    public getControlType(): string{
        return this.controlType;
    }

    public setParent(parent: Control): void {
        this.parent = parent;
        this.zOrder = parent.zOrder + 1;
    }
}