import { Control } from "./control";
import { Rgb } from "./rgb";

export class Panel extends Control {
    constructor(x: number, y: number, width: number, height: number, backgroundImage: HTMLImageElement | null, backgroundColor: Rgb | null, border: Rgb | null, borderLineWidth: number, zOrder: number, parent: Control, ctx: CanvasRenderingContext2D){
        super(x, y, width, height, backgroundImage, backgroundColor, border, borderLineWidth, zOrder, parent, ctx);
    }

    public draw(){
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