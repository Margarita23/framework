import { Panel } from "./panel";
import { InputText } from "./inputText";
import { Rgb } from "./rgb";

export class Input extends Panel {

    protected controlType: string = "Input";
    private _focus: boolean = false;
    public inputText: InputText = new InputText();
    private showText: string = "";
    public font: string = "30px Arial";
    public fillStyle: Rgb = new Rgb(0,0,0);
    public padding: number = 5;
    //public backgroundImageFocus: HTMLImageElement | null = this.backgroundImage;
    //public backgroundColorFocus: Rgb | null = new Rgb(250, 250, 250);
    //public borderFocus: Rgb | null = this.border;
    //public borderLineWidthFocus: number = 0;

    constructor(){
        super();
    }

    get focus(): boolean { return this._focus; }
    set focus(newFocus: boolean) { this._focus = newFocus; }

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
        let padding = this.getPaddingInPx();
        this.focus = true;
        this.ctx.font = this.font;
        this.ctx.lineWidth = this.borderLineWidth + 3;
        if(this.border){
            let newBorder = this.border;
            newBorder.red + 50;
            newBorder.green + 100;
            newBorder.blue + 100;
            this.ctx.strokeStyle = newBorder.getColor();
        }
        //if(this.backgroundColor){
        //    this.ctx.fillStyle = this.backgroundColorFocus.getColor();
        //    this.ctx.fillRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
        //    this.ctx.strokeRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
        //}
        //if(this.fillStyle){
        //    this.ctx.fillStyle = this.fillStyle.getColor();
        //}
        //this.ctx.textBaseline = "middle";
        //this.ctx.textAlign = "start";
        //this.ctx.fillText(this.showText, this.x + padding + this.pX, this.y + this.height/2 + this.pY, this.width - padding*2);
    }

    public unfocus(): void {
        let padding = this.getPaddingInPx();

        this.focus = false;
        this.ctx.font = this.font;
        this.ctx.lineWidth = this.borderLineWidth;
        if(this.border){
            this.ctx.strokeStyle = this.border.getColor();
        }
        if(this.backgroundColor){
            this.ctx.fillStyle = this.backgroundColor.getColor();
            this.ctx.fillRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
            this.ctx.strokeRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
        }
        if(this.fillStyle){
            this.ctx.fillStyle = this.fillStyle.getColor();
        }
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "start";
        this.ctx.fillText(this.showText, this.x + padding + this.pX, this.y + this.height/2 + this.pY, this.width - padding*2);
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
        this.ctx.font = this.font;
        //this.ctx.fillStyle = this.backgroundColorFocus.getColor();
        this.ctx.fillRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
        this.ctx.strokeRect(this.x + this.pX, this.y + this.pY, this.width, this.height);
        this.ctx.fillStyle = this.fillStyle.getColor();
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "start";
        this.ctx.fillText(this.showText, this.x + padding + this.pX, this.y + this.height/2 + this.pY);
    }
}