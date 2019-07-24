import { Rgb } from "../models/rgb";
import { Panel } from "./panel";

export class Control {
    protected controlType: string = "Control";
    public controls: Control[] = [];
    private _x: number = 0;
    private _y: number = 0;
    private _width: number = 150;
    private _height: number = 75;
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

    public newW: number = this.width;
    public newH: number = this.height;

    public click: (control: Control) => void;
    public mouseup: (constrol: Control) => void;
    public mousedown: (control: Control) => void;
    public mousemove: (control: Control) => void;
    public mouseleave: (control: Control) => void;
    public mouseover: (control: Control) => void;

    public draw(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx;
    }

    get x():number { return this._x; }
    set x(newX: number) { this._x = newX; }

    get y():number { return this._y; }
    set y(newY: number) { this._y = newY; }

    get width():number { return this._width; }
    set width(newWidth: number) {
        this._width = newWidth;
        this.newW = newWidth;
    }

    get height():number { return this._height }
    set height(newHeight: number) {
        this._height = newHeight;
        this.newH = newHeight;
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
        
        if(this.x >= newParent.newW) {
            this.newW = 0;
        } else if(this.x + this.width > newParent.newW){
            this.newW = newParent.newW - this.x;
        } else {
            this.newW = this.width;
        }
  
        if(this.y >= newParent.newH) {
            this.newH = 0;
        } else if(this.y + this.height > newParent.newH){
            this.newH = newParent.newH - this.y;
        } else {
            this.newH = this.height;
        }
    }
/*
    get backgroundImage():HTMLImageElement { return this._backgroundImage; }
    set backgroundImage(newGroundImage: HTMLImageElement) {
        if(newGroundImage !== null) {
            newGroundImage.onload = () => {
                this._backgroundImage = newGroundImage;
            }
        }
    }
*/
    public getControlType(): string{
        return this.controlType;
    }
}