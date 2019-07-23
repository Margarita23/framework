import { Control } from "./control";
import { Rgb } from "../models/rgb";

export class Button extends Control{

    protected controlType: string = "Button";
    public text: string = "Button";
    public padding: number = 10;
    public font: string = "30px Arial";
    public fillStyle: Rgb = new Rgb(0,0,0);

    constructor(){ super(); }

    private getPaddingInPx(): number{
        let padding = (this.padding * this.width / 100) / 2;
        return padding;
    }

    public draw(ctx: CanvasRenderingContext2D){
        super.draw(ctx);

        this.ctx.clearRect(this.x + this.pX, this.y + this.pY, this.pW, this.pH);

        if(this.backgroundImage){
            this.ctx.drawImage(this.backgroundImage, this.x + this.pX, this.y + this.pY, this.pW, this.pH);
        }
        else if(this.backgroundColor)
        {
            this.ctx.fillStyle = this.backgroundColor.getColor();
            this.ctx.fillRect(this.x + this.pX, this.y + this.pY, this.pW, this.pH);
        }
        if(this.border){
            this.ctx.strokeStyle = this.border.getColor();
            this.ctx.strokeRect(this.x + this.pX, this.y + this.pY, this.pW, this.pH);
        };

        this.ctx.font = this.font;
        let oldFillStyle = this.ctx.fillStyle;
        this.ctx.fillStyle = this.fillStyle.getColor();
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        if(this.text){
            this.ctx.fillText(this.text, this.x + this.pX + this.pW/2, this.y + this.pH/2 + this.pY, this.pW - this.getPaddingInPx()*2);
        }
        this.ctx.fillStyle = oldFillStyle;
    }
}