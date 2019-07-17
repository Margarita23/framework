import { Control } from "./control";
import { Rgb } from "./rgb";
import { RadioButton } from "./radioButton";

export class Panel extends Control {

    protected controlType: string = "Panel";
    public innerText: string;
    public font: string = "30px Arial";
    public fillStyle: Rgb = new Rgb(0,0,0);

    constructor(){ super(); }

    public draw(ctx: CanvasRenderingContext2D){
        super.draw(ctx);
        if(this.backgroundImage)
        {
            this.backgroundImage.onload = () => {
                this.ctx.drawImage(this.backgroundImage, this.x, this.y, this.width, this.height);
            };
        }
        else if(this.backgroundColor !== null)
        {
            this.ctx.fillStyle = this.backgroundColor.getColor();
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if(this.border !== null){
            this.ctx.strokeStyle = this.border.getColor();
            this.ctx.strokeRect(this.x, this.y, this.width, this.height)
        };

        if(this.innerText){
            this.ctx.font = this.font;
            this.ctx.fillStyle = this.fillStyle.getColor();
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(this.innerText, this.x, this.y + this.height/2, this.width);
        }
    }
}