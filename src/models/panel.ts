import { Control } from "./control";
import { Rgb } from "./rgb";
import { InputText } from "./inputText";

export class Panel extends Control {

    protected controlType: string = "Panel";
    public innerText: InputText = new InputText();
    public font: string = "30px Arial";
    public fillStyle: Rgb = new Rgb(0,0,0);

    constructor(){ super(); }

    public draw(ctx: CanvasRenderingContext2D){
        super.draw(ctx);
        if(this.backgroundImage)
        {
            this.backgroundImage.onload = () => {
                this.ctx.drawImage(this.backgroundImage, this.x + this.pX, this.y + this.pX, this.width, this.height);
            };
        }
        else if(this.backgroundColor !== null)
        {
            this.ctx.fillStyle = this.backgroundColor.getColor();
            this.ctx.fillRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
        }
        if(this.border !== null){
            this.ctx.strokeStyle = this.border.getColor();
            this.ctx.strokeRect(this.x + this.pX, this.y + this.pY, this.width, this.height)
        };
        this.getText();
    }

    public getText(): void{
        if(this.innerText && this.innerText.getText()){
            this.ctx.font = this.font;
            this.ctx.fillStyle = this.fillStyle.getColor();
            let oldAlight = this.ctx.textAlign;
            this.ctx.textAlign = <CanvasTextAlign>this.innerText.align;
            this.ctx.textBaseline = "middle";
            this.ctx.textAlign = "start";
            this.ctx.fillText(this.innerText.getText(), this.x + this.innerText.startX + this.pX, this.y + this.height/2 + this.pY, this.width);
            this.ctx.textAlign = oldAlight;
        }
    }
}