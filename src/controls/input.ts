import { Panel } from "./panel";
import { InputText } from "./inputText";
import { Rgb } from "../models/rgb";

export class Input extends Panel {

    protected controlType: string = "Input";
    public focus: boolean = false;
    public inputText: InputText = new InputText();
    private showText: string = "";
    public font: string = "30px Arial";
    public fillStyle: Rgb = new Rgb(0,0,0);
    public padding: number = 5;
    public backgroundImageFocus: HTMLImageElement | null = this.backgroundImage;
    public backgroundColorFocus: Rgb | null = new Rgb(250, 250, 250);
    public borderFocus: Rgb | null = this.border;
    public borderLineWidthFocus: number = 0;

    constructor(){
        super();
    }

    private getPaddingInPx(): number{
        let padding = (this.padding * this.width / 100) / 2;
        return padding;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        this.showText = this.inputText.getText();
        let padding = this.getPaddingInPx();
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.fillStyle.getColor();
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "start";
        this.ctx.fillText(this.inputText.getText(), this.x + padding + this.pX, this.y + this.height/2 + this.pY, this.width - padding*2);
    }

    public focusOnMe(): void {
        this.focus = true;
        this.ctx.clearRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
        this.redrawBackOfInputFocus();
        this.redrawTextFocus();
    }

    public unfocus(): void {
        this.focus = false;
        this.ctx.clearRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
        this.redrawBackOfInput();
        this.redrawText();
    }

    public printText(){
        let padding = this.getPaddingInPx();
        let textLength = this.inputText.getText().length;
        this.showText = this.inputText.getText();
        let sum = 0;
        for(let i = textLength - 1; i >= 0; i--){
            let tW = this.ctx.measureText(this.inputText.getText()[i]).width;
            if(sum < (this.width - padding*2 - tW*2 )){
                sum += tW;
            }else {
                this.showText = this.inputText.getText().slice(i, this.inputText.getText().length);
                break;
            }
        }

        this.ctx.clearRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
        this.redrawBackOfInputFocus();
        this.redrawTextFocus();
    }

    public redrawBackOfInput(){
        this.ctx.clearRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
        if(this.backgroundImage){
            this.ctx.drawImage(this.backgroundImage, this.x + this.pX, this.y + this.pY, this.width, this.height);
        }else if(this.backgroundColor){
            this.ctx.fillStyle = this.backgroundColor.getColor();
            this.ctx.fillRect(this.x + this.pX, this.y + this.pY, this.pW, this.pH);
        }
        if(this.border){
            this.ctx.strokeStyle = this.border.getColor();
            this.ctx.strokeRect(this.x + this.pX, this.y + this.pY, this.pW, this.pH);
        };
    }

    public redrawBackOfInputFocus(){
        this.ctx.clearRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
        if(this.backgroundImageFocus){
            this.ctx.drawImage(this.backgroundImageFocus, this.x + this.pX, this.y + this.pY, this.pW, this.pH);
        }else if(this.backgroundColorFocus){
            this.ctx.fillStyle = this.backgroundColorFocus.getColor();
            this.ctx.fillRect(this.x + this.pX, this.y + this.pY, this.pW, this.pH);
        }
        if(this.borderFocus){
            this.ctx.strokeStyle = this.borderFocus.getColor();
            this.ctx.strokeRect(this.x + this.pX, this.y + this.pY, this.pW, this.pH);
        };
    }

    public redrawText(){
        let padding = this.getPaddingInPx();
        this.ctx.font = this.font;
        this.ctx.lineWidth = this.borderLineWidth;
        if(this.fillStyle){ this.ctx.fillStyle = this.fillStyle.getColor(); }
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "start";
        this.ctx.fillText(this.showText, this.x + padding + this.pX, this.y + this.height/2 + this.pY);
    }

    public redrawTextFocus(){
        let padding = this.getPaddingInPx();
        this.ctx.font = this.font;
        this.ctx.lineWidth = this.borderLineWidthFocus;
        if(this.fillStyle){ this.ctx.fillStyle = this.fillStyle.getColor(); }
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "start";
        this.ctx.fillText(this.showText, this.x + padding + this.pX, this.y + this.height/2 + this.pY);
    }
}