import { Control } from "./control";
import { Rgb } from "./rgb";

export class Checkbox extends Control {

    protected controlType: string = "Checkbox";
    public autofocus: boolean = false;
    private _checked: boolean = false;
    public disabled: boolean = false;
    public name: string = "Checkbox";
    public width: number = 50;
    public height: number = 50;

    constructor(){ super(); }

    draw(ctx: CanvasRenderingContext2D){
        super.draw(ctx);
        this.ctx.strokeRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
        this.ctx.textBaseline = "bottom";
        this.ctx.fillText(this.name, this.x + this.width + this.width*0.1 + this.pX, this.y + this.height + this.pY);
    }

    get checked(): boolean{ return this._checked; }
    set checked(newChecked: boolean) {
        this._checked = newChecked;
        if(this._checked){
            this.ctx.lineWidth = 5;
            this.ctx.beginPath();
            this.ctx.moveTo(this.x + this.width*0.2  + this.pX, this.y + this.height*0.5 + this.pY);
            this.ctx.lineTo(this.x + this.width*0.5  + this.pX, this.y + this.height*0.8 + this.pY);
            this.ctx.lineTo(this.x + this.width*0.8 + this.pX, this.y + this.height*0.2 + this.pY);
            this.ctx.stroke();
        } else {
            this.ctx.fillStyle = (new Rgb(255,255,255)).getColor();
            this.ctx.fillRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
            this.ctx.strokeRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
        }
    }
}