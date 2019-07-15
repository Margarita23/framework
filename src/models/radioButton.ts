import { Rgb } from "./rgb";
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
        this.ctx.fillStyle = this.fillStyle.getColor();
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.textBaseline = "bottom";
        this.ctx.fillText(this.name, this.x + this.radius*2, this.y + this.radius*2);
    }

    get disabled(): boolean { return this._disabled; }
    set disabled(newDisabled: boolean){
        /*if(newDisabled) {
            this.ctx.fillStyle = this.fillStyle.getColor();
        } else {
            this.ctx.fillStyle = this.disabledFillStyle.getColor();
        }
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius/2, 0, 2 * Math.PI);
        this.ctx.fill();
*/
        this._disabled = newDisabled;
    }

    get checked():boolean { return this._checked; }
    set checked(isCheck: boolean) {
        this._checked = isCheck;
        if(isCheck){
            this.ctx.fillStyle = this.fillStyle.getColor();
            this.ctx.beginPath();
            this.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius/2, 0, 2 * Math.PI);
            this.ctx.fill();
        } else {
            this.ctx.fillStyle = (new Rgb(255,255,255)).getColor();
            this.ctx.beginPath();
            this.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
            this.ctx.fill();

            this.ctx.fillStyle = this.fillStyle.getColor();
            this.ctx.beginPath();
            this.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    }



/*
    public isChecked(): void {
        if(!this.disabled){
            this.checked = true;
            this.ctx.fillStyle = this.fillStyle.getColor();
        } else {
            this.ctx.fillStyle = this.disabledFillStyle.getColor();
        }
            this.ctx.beginPath();
            this.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius/2, 0, 2 * Math.PI);
            this.ctx.fill();
    }

    public isNotChecked(){
        if(!this.disabled){
            this.checked = false;
            this.ctx.fillStyle = (new Rgb(255,255,255)).getColor();
        } else {
            this.ctx.fillStyle = (new Rgb(150,150,150)).getColor();

        }
        this.ctx.beginPath();
            this.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
            this.ctx.fill();

            this.ctx.fillStyle = this.fillStyle.getColor();

            this.ctx.beginPath();
            this.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
            this.ctx.stroke();
    }
*/

    public setDisabled(disabled: boolean): void{
        this.disabled = disabled;
        console.log(this.ctx);
    }

}