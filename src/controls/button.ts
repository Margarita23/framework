import { Control } from "./control";
import { Rgb } from "../models/rgb";

export class Button extends Control{

    readonly controlType: string = "Button";
    public text: string = "Button";
    public padding: number = 10;
    public font: string = "30px Arial";
    public fillStyle: Rgb = new Rgb(0,0,0);

    constructor(){ super(); }

    private createNewHOLST(){
        this.canvas1.width = this.newW;
        this.canvas1.height = this.newH;
        this.ctx1 = this.canvas1.getContext("2d");

        if(this.backgroundImage){
            this.ctx1.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
        }
        else if(this.backgroundColor)
        {
            this.ctx1.fillStyle = this.backgroundColor.getColor();
            this.ctx1.fillRect(0, 0, this.width, this.height);
        }
        if(this.border){
            this.ctx1.strokeStyle = this.border.getColor();
            this.ctx1.strokeRect(0, 0, this.width, this.height);
        };
        this.ctx1.save();
        this.ctx1.font = this.font;
        this.ctx1.fillStyle = this.fillStyle.getColor();
        this.ctx1.textBaseline = "middle";
        this.ctx1.textAlign = "center";
        if(this.text){
            this.ctx1.fillText(this.text, this.width/2, this.height/2, this.width - this.getPaddingInPx()*2);
        }
        this.ctx1.restore();
        this.cutImage = this.ctx1.getImageData(0, 0, this.newW, this.newH);

        this.canvas1.remove();
    }

    private getPaddingInPx(): number{
        let padding = (this.padding * this.width / 100) / 2;
        return padding;
    }

    public draw(ctx: CanvasRenderingContext2D){
        super.draw(ctx);

        if(this.newW === 0 || this.newH === 0){
            return
        }

        if(this.newW < this.width || this.newH < this.height){
            this.createNewHOLST();
            this.ctx.clearRect(this.x + this.pX, this.y + this.pY, this.newW, this.newH);
            this.ctx.putImageData(this.cutImage, this.x + this.pX, this.y + this.pY);
            return
        }

        if(this.newW === this.width || this.newH === this.height){
            this.ctx.clearRect(this.x + this.pX, this.y + this.pY, this.newW, this.newH);
            if(this.backgroundImage){
                this.ctx.drawImage(this.backgroundImage, this.x + this.pX, this.y + this.pY, this.width, this.height);
            }
            if(this.backgroundColor){
                this.ctx.fillStyle = this.backgroundColor.getColor();
                this.ctx.fillRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
            }
            if(this.border){
                this.ctx.strokeStyle = this.border.getColor();
                this.ctx.strokeRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
            };

            this.ctx.save();
            this.ctx.font = this.font;
            this.ctx.fillStyle = this.fillStyle.getColor();
            this.ctx.textBaseline = "middle";
            this.ctx.textAlign = "center";
            console.log(this.ctx.fillStyle);
            console.log(this.backgroundImage);
            if(this.text){
                this.ctx.fillText(this.text, this.x + this.pX + this.width/2, this.y + this.height/2 + this.pY, this.width - this.getPaddingInPx()*2);
            }

            this.ctx.restore();
        }
    }
}