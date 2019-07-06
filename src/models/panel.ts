import { Control } from "./control";
import { Rgb } from "./rgb";

export class Panel extends Control {
    constructor(zOrder: number, ctx: CanvasRenderingContext2D){
        super(zOrder, ctx);
    }

    public draw(){
        super.draw();
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
    }
}