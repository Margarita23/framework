import { Control } from "./control";
import { Rgb } from "../models/rgb";
import { InputText } from "./inputText";
import { Button } from "./button";

export class Panel extends Control {

    readonly controlType: string = "Panel";
    public innerText: InputText = new InputText();
    public font: string = "30px Arial";
    public fillStyle: Rgb = new Rgb(0,0,0);

    public cutImage: ImageData;
    public ctx1: CanvasRenderingContext2D;
    public canvas1 = document.createElement("canvas");
    private _isScroll: boolean = false;
    public fix: boolean = true;
    public widgetVertical: Button = new Button();
    public wholeWidth: number = this.width;
    public wholeHeight: number = this.height;

    constructor(){ super(); }

    public draw(ctx: CanvasRenderingContext2D){
        super.draw(ctx);

        if(this.isScroll){
            this.ctx.fillStyle = (new Rgb(255,255,255)).getColor();
            this.ctx.fillRect(this.newW - this.widgetVertical.newW + this.widgetVertical.pX, this.y + this.pY , this.widgetVertical.newW, this.newH);
            this.ctx.strokeStyle = (new Rgb(0,0,0)).getColor();
            this.ctx.strokeRect(this.newW - this.widgetVertical.newW + this.widgetVertical.pX, this.y + this.pY , this.widgetVertical.newW, this.newH);
        }

        if(this.newW === 0 || this.newH === 0){
            return
        }

        if(this.parent && (this.newW < this.width || this.newH < this.height)){
            this.createNewHOLST();
            this.ctx.clearRect(this.x + this.pX, this.y + this.pY, this.newW, this.newH);
            this.ctx.putImageData(this.cutImage, this.x + this.pX, this.y + this.pY);
        }

        if(this.newW === this.width || this.newH === this.height){
            if(this.backgroundImage){
                //this.backgroundImage.onload = () => {
                    this.ctx.drawImage(this.backgroundImage, this.x + this.pX, this.y + this.pY, this.newW, this.newH);
                //}
            } else if(this.backgroundColor !== null){
                this.ctx.fillStyle = this.backgroundColor.getColor();
                this.ctx.fillRect(this.x + this.pX, this.y + this.pY, this.newW, this.newH);
            }

            if(this.border !== null){
                this.ctx.strokeStyle = this.border.getColor();
                this.ctx.strokeRect(this.x + this.pX, this.y + this.pY, this.newW, this.newH);
            };
            this.getText();
        }
    }

    get isScroll(){ return this._isScroll; }
    set isScroll(scroll: boolean){
        this._isScroll = scroll;
        if(this._isScroll){
            this.drawWidgetVertical(this.newW - 30, 0, 30, 30, "|");
        } else {
            this.drawWidgetVertical(0, 0, 0, 0, "");
        }
    }

    private createNewHOLST(){
        this.canvas1.width = this.width;
        this.canvas1.height = this.height;
        this.ctx1 = this.canvas1.getContext("2d");

        //перед отрисовкой попробовать манипуляции с альфа-каналом (globalAlpha).
        if(this.backgroundColor)
        {
            this.ctx1.fillStyle = this.backgroundColor.getColor();
            this.ctx1.fillRect(0, 0, this.width, this.height);
        }
        if(this.backgroundImage){
            this.ctx1.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
        }
        if(this.border){
            this.ctx1.strokeStyle = this.border.getColor();
            this.ctx1.strokeRect(0, 0, this.width, this.height);
        };
        
        if(this.innerText && this.innerText.getText()){
            this.ctx.save();
            this.ctx1.font = this.font;
            this.ctx1.fillStyle = this.fillStyle.getColor();
            this.ctx1.textAlign = <CanvasTextAlign>this.innerText.align;
            this.ctx1.textBaseline = "middle";
            this.ctx1.fillText(this.innerText.getText(), this.x + this.innerText.startX + this.pX, this.y + this.innerText.startY + this.height/2 + this.pY, this.width);
            this.ctx.restore();
        }
        this.cutImage = this.ctx1.getImageData(0, 0, this.newW, this.newH);
        this.canvas1.remove();
    }

    public getText(): void{
        if(this.innerText && this.innerText.getText()){
            this.ctx.save();
            this.ctx.font = this.font;
            this.ctx.fillStyle = this.fillStyle.getColor();
            this.ctx.textAlign = <CanvasTextAlign>this.innerText.align;
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(this.innerText.getText(), this.x + this.innerText.startX + this.pX, this.y + this.innerText.startY + this.height/2 + this.pY, this.width);
            this.ctx.restore();
        }
    }

    public drawWidgetVertical(x: number, y: number, width: number, height: number, text: string): void{
        this.widgetVertical.x = x;
        this.widgetVertical.y = y;
        this.widgetVertical.width = width;
        this.widgetVertical.height = height;
        this.widgetVertical.parent = this;
        this.widgetVertical.text = text;
        this.widgetVertical.name = "widgetVertical";
    }
}