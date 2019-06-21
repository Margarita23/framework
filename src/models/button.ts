import { Control } from "./control";

export class Button extends Control{
    constructor(x: number, y: number, width: number, height: number, backgroundImage: HTMLImageElement | null, backgroundColor: string | null, border: string | null, zOrder: number, parent?: Control){
        super(x, y, width, height, backgroundImage, backgroundColor, border, zOrder, parent);
    }

    public draw(ctx: CanvasRenderingContext2D){
        if(this.backgroundImage)
        {
            this.backgroundImage.onload = () => {
                ctx.drawImage(this.backgroundImage, this.x, this.y, this.width, this.height);
            };
        }
        else if(this.backgroundColor && this.backgroundColor !== "noBackground")
        {
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(this.x, this.x, this.width, this.height);
        }
        if(this.border && this.border !== "no"){
            ctx.strokeStyle = this.border;
            ctx.strokeRect(this.x, this.y, this.width, this.height)
        };
    }

}