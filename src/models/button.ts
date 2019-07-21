import { Control } from "./control";
import { Rgb } from "./rgb";

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

        if(this.backgroundImage)
        {
            this.backgroundImage.onload = () => {
                this.ctx.drawImage(this.backgroundImage, this.x + this.pX, this.y + this.pY, this.width, this.height);
            }
        }
        else if(this.backgroundColor)
        {
            this.ctx.fillStyle = this.backgroundColor.getColor();
            this.ctx.fillRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
        }
        if(this.border){
            this.ctx.strokeStyle = this.border.getColor();
            this.ctx.strokeRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
        };

        this.ctx.font = this.font;
        this.ctx.fillStyle = this.fillStyle.getColor();
        this.ctx.textBaseline = "middle";
        if(this.text){
            this.ctx.fillText(this.text, this.x + this.getPaddingInPx() + this.pX, this.y + this.height/2 + this.pY, this.width - this.getPaddingInPx()*2);
        }
    }

    public getShadow(): void{
        this.ctx.shadowOffsetX = 500;
        this.ctx.shadowOffsetY = 500;
        this.ctx.shadowBlur = 7;
        this.ctx.shadowColor = 'rgb(0,0,0)';

        this.ctx.beginPath();
        this.ctx.rect(this.x + this.pX - 500, this.y + this.pY - 500, this.width, this.height);
        this.ctx.stroke();

        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowBlur = 0;
    }
}