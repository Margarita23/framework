import { Rgb } from "../models/rgb";
import { Control } from "./control";

export class RadioButton extends Control {

    protected controlType: string = "RadioButton";
    public autofocus: boolean = false;
    public _checked: boolean = false;
    private _disabled: boolean = false;
    public disabledFillStyle: Rgb = new Rgb(150,150,150);
    public name: string = "RadioButton";

    public font: string = "30px Arial";
    public fillStyle: Rgb = new Rgb(0,0,0);
    public radius: number = 20;
    public width: number = this.radius*2;
    public height: number = this.radius*2;

    constructor(){ super(); }

    draw(ctx: CanvasRenderingContext2D){
        super.draw(ctx);
        if(this.disabled) {
            this.ctx.fillStyle = this.disabledFillStyle.getColor();
        } else {
            this.ctx.fillStyle = this.fillStyle.getColor();
        }
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.radius + this.pX, this.y + this.radius + this.pY, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.save();
        this.ctx.textBaseline = "bottom";
        this.ctx.textAlign = "start";
        this.ctx.font = this.font;
        this.ctx.fillText(this.name, this.x + this.radius*2 + this.pX, this.y + this.radius*2 + this.pY);
        this.ctx.restore();
    }

    get disabled(): boolean { return this._disabled; }
    set disabled(newDisabled: boolean){
        this._disabled = newDisabled;
    }

    get checked():boolean { return this._checked; }
    set checked(isCheck: boolean) {
        if(!this.disabled){
            this._checked = isCheck;
            if(isCheck){
                this.ctx.fillStyle = this.fillStyle.getColor();
                this.ctx.beginPath();
                this.ctx.arc(this.x + this.radius + this.pX, this.y + this.radius + this.pY, this.radius/2, 0, 2 * Math.PI);
                this.ctx.fill();
            } else {
                this.ctx.fillStyle = (new Rgb(255,255,255)).getColor();
                this.ctx.beginPath();
                this.ctx.arc(this.x + this.radius + this.pX, this.y + this.radius + this.pY, this.radius, 0, 2 * Math.PI);
                this.ctx.fill();

                this.ctx.fillStyle = this.fillStyle.getColor();
                this.ctx.beginPath();
                this.ctx.arc(this.x + this.radius + this.pX, this.y + this.radius + this.pY, this.radius, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
        }
    }

    public setChecked(radio: RadioButton, radios: RadioButton[]){
        radios.forEach(r => {
            if(radio !== r && !r.disabled){
                r.checked = false;
            } else if (radio === r && radio.checked === false && !r.disabled){
                radio.checked = true;
            }
        });
    }
}