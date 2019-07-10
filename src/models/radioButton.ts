import { Rgb } from "./rgb";
import { Control } from "./control";
import { of } from "rxjs";

export class RadioButton extends Control {

    protected controlType: string = "RadioButton";
    public autofocus: boolean = false;
    public checked: boolean = false;
    private disabled: boolean = false;
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

    public setDisabled(disabled: boolean){
        this.disabled = disabled;
        console.log(this);
    }

}