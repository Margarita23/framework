import { Control } from "./control";
import { Rgb } from "../models/rgb";
import { InputText } from "./inputText";
import { Button } from "./button";
import { TextAlight } from "../models/text-alight";

export class Panel extends Control {
    readonly controlType: string = "Panel";
    public innerText: InputText = new InputText();
    public font: string = "30px Arial";
    public fillStyle: Rgb = new Rgb(0,0,0);
    public textAlight: TextAlight = TextAlight.Left;

    public cutImage: ImageData | any;
    public ctx1: CanvasRenderingContext2D | any;
    public canvas1 = document.createElement("canvas");
    private _isScroll: boolean = false;
    public fix: boolean = true;
    public widgetVertical: Button = new Button();
    public wholeWidth: number = this.width;
    public wholeHeight: number = this.height;

    constructor(){ super(); }

    public draw(ctx: CanvasRenderingContext2D){
        super.draw(ctx);

        if(this.newW === 0 || this.newH === 0){
            return
        }

        if(this.x < 0 || this.y < 0 ||
            (this.parent && (this.x + this.width > this.parent.width)) ||
            (this.parent && (this.y + this.height > this.parent.height))){
            this.createNewHOLST();

            if(this.x < 0 && this.y >= 0){
                this.ctx.drawImage(this.canvas1, this.sourceX, 0, this.newW, this.newH, this.pX, this.pY + this.y, this.newW, this.newH);
                this.canvas1.remove();
                return
            }

            if(this.y < 0 && this.x >= 0){
                this.ctx.drawImage(this.canvas1, 0, this.sourceY, this.newW, this.newH, this.pX + this.x, this.pY, this.newW, this.newH);
                this.canvas1.remove();
                return
            }

            if(this.x < 0 && this.y < 0){
                this.ctx.drawImage(this.canvas1, this.sourceX, this.sourceY, this.newW, this.newH, this.pX, this.pY, this.newW, this.newH);
                this.canvas1.remove();
                return
            }

            if(this.x + this.width > this.parent.width){
                this.ctx.drawImage(this.canvas1, 0, 0, this.newW, this.newH, this.pX + this.x, this.pY + this.y, this.newW, this.newH);
                this.canvas1.remove();
                return
            }

            if(this.y + this.height > this.parent.height){
                this.ctx.drawImage(this.canvas1, 0, 0, this.newW, this.newH, this.pX + this.x, this.pY + this.y, this.newW, this.newH);
                this.canvas1.remove();
                return
            }
        }

        if(this.newW === this.width || this.newH === this.height){
            if(this.backgroundColor !== null){
                this.ctx.fillStyle = this.backgroundColor.getColor();
                this.ctx.fillRect(this.x + this.pX, this.y + this.pY, this.newW, this.newH);
            }
            if(this.backgroundImage){
                this.ctx.drawImage(this.backgroundImage, this.x + this.pX, this.y + this.pY, this.newW, this.newH);
            }
            if(this.border !== null){
                this.ctx.strokeStyle = this.border.getColor();
                this.ctx.strokeRect(this.x + this.pX, this.y + this.pY, this.newW, this.newH);
            };
            this.getText();
        }

        if(this.isScroll) {
            this.ctx.fillStyle = (new Rgb(255, 255, 255)).getColor();
            this.ctx.fillRect(this.pX + this.x + this.newW - this.widgetVertical.newW, this.y + this.pY , this.widgetVertical.newW, this.newH);
            this.ctx.strokeStyle = (new Rgb(0,0,0)).getColor();
            this.ctx.strokeRect(this.newW - this.widgetVertical.newW + this.widgetVertical.pX, this.y + this.pY , this.widgetVertical.newW, this.newH);
        }
    }

    get isScroll(){ return this._isScroll;}
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

        if(this.backgroundColor){
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
            this.ctx1.save();
            this.ctx1.font = this.font;
            this.ctx1.fillStyle = this.fillStyle.getColor();
            this.ctx1.textBaseline = "middle";
            let startText = 0;
            switch(this.textAlight){
                case TextAlight.Left :
                    startText = 0;
                    break;
                case TextAlight.Center :
                    startText = this.width/2 - this.ctx1.measureText(this.innerText.getText()).width / 2;
                    break;
                case TextAlight.Right :
                    startText = this.width - this.ctx1.measureText(this.innerText.getText()).width;
                    break;
            }
            this.ctx1.fillText(this.innerText.getText(), this.x + this.innerText.startX + this.pX + startText, this.y + this.innerText.startY + this.height/2 + this.pY, this.width);
            this.ctx1.restore();
        }
    }

    public getText(): void {
        if(this.innerText && this.innerText.getText()){

            let startText = 0;
            switch(this.textAlight){
                case TextAlight.Left :
                    startText = 0;
                    break;
                case TextAlight.Center :
                    startText = this.width/2 - this.ctx.measureText(this.innerText.getText()).width / 2;
                    break;
                case TextAlight.Right :
                    startText = this.width - this.ctx.measureText(this.innerText.getText()).width;
                    break;
            }

            this.ctx.save();
            this.ctx.font = this.font;
            this.ctx.fillStyle = this.fillStyle.getColor();
            this.ctx.textAlign = <CanvasTextAlign>this.innerText.align;
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(this.innerText.getText(), this.x + this.innerText.startX + this.pX + startText, this.y + this.innerText.startY + this.height/2 + this.pY, this.width);
            this.ctx.restore();
        }
    }

    public drawWidgetVertical(x: number, y: number, width: number, height: number, text: string): void{
        this.widgetVertical.name = "widgetVertical";
        this.widgetVertical.x = x;
        this.widgetVertical.y = y;
        this.widgetVertical.width = width;
        this.widgetVertical.height = height;
        this.widgetVertical.text = text;
        this.widgetVertical.parent = this;
    }
}