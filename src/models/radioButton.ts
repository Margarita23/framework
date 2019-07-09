import { Rgb } from "./rgb";
import { Control } from "./control";

export class RadioButton extends Control {

    protected controlType: string = "RadioButton";
    public autofocus: boolean = false;
    public checked: boolean = false;
    public disabled: boolean = false;
    public name: string = "RadioButton";

    public font: string = "30px Arial";
    public fillStyle: Rgb = new Rgb(0,0,0);
    public radius: number = 20;
    public width: number = this.radius*2;
    public height: number = this.radius*2;

    constructor(){ super(); }

    draw(ctx: CanvasRenderingContext2D){
        super.draw(ctx);
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.textBaseline = "bottom";
        this.ctx.fillText(this.name, this.x + this.radius*2, this.y + this.radius*2);

        /*
        if(this.backgroundImage)
        {
            this.backgroundImage.onload = () => {
                this.ctx.drawImage(this.backgroundImage, this.x, this.y, this.width, this.height);
            };
        }
        else if(this.backgroundColor)
        {
            this.ctx.fillStyle = this.backgroundColor.getColor();
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if(this.border){
            this.ctx.strokeStyle = this.border.getColor();
            this.ctx.strokeRect(this.x, this.y, this.width, this.height)
        };

        this.ctx.font = this.font;
        this.ctx.fillStyle = this.fillStyle.getColor();
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.text, this.x + this.getPaddingInPx(), this.y + this.height/2, this.width - + this.getPaddingInPx()*2);

        */
    }

    public isChecked(): void {
        this.checked = true;
        this.ctx.fillStyle = (new Rgb(0,0,0)).getColor();
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius/2, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    public isNotChecked(){

        this.checked = false;

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