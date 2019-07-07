import { Control } from "./control";
import { Rgb } from "./rgb";

export class Button extends Control{
    public text: string = "Button";
    public padding: number = 10;
    public font: string = "30px Arial";
    public fillStyle: Rgb = new Rgb(0,0,0);

    constructor(zOrder: number){
        super(zOrder);
    }

    private getPaddingInPx(): number{
        let padding = (this.padding * this.width / 100) / 2;
        return padding;
    }

    public draw(ctx: CanvasRenderingContext2D){
        super.draw(ctx);
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
    }

}