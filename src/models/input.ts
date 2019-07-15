import { Control } from "./control";
import { Panel } from "./panel";
import { InputText } from "./inputText";
import { Rgb } from "./rgb";

export class Input extends Panel {

    protected controlType: string = "Input";

    public focus: boolean = false;
    public inputText: InputText = new InputText();

    public font: string = "30px Arial";
    public fillStyle: Rgb = new Rgb(0,0,0);

    public padding: number = 5;

    public backgroundImageFocus: HTMLImageElement | null = this.backgroundImage;
    public backgroundColorFocus: Rgb | null = new Rgb(250, 250, 250);
    public borderFocus: Rgb | null = this.border;
    public borderLineWidthFocus: number = 0;
    public click: () => void = () => this.focusOnMe();

    constructor() { super(); }

    private getPaddingInPx(): number{
        let padding = (this.padding * this.width / 100) / 2;
        return padding;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        let padding = this.getPaddingInPx();
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.fillStyle.getColor();
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.inputText.getText(), this.x + padding, this.y + this.height/2, this.width - padding*2);
    }

    public focusOnMe(): void {
        let padding = this.getPaddingInPx();
        this.focus = true;
        this.ctx.font = this.font;
        this.ctx.lineWidth = this.borderLineWidthFocus;
        this.ctx.strokeStyle = this.borderFocus.getColor();
        this.ctx.fillStyle = this.backgroundColorFocus.getColor();
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = this.fillStyle.getColor();
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.inputText.getText(), this.x + padding, this.y + this.height/2, this.width - padding*2);
    }

    public unfocus(): void {
        let padding = this.getPaddingInPx();

        this.focus = false;
        this.ctx.font = this.font;
        this.ctx.lineWidth = this.borderLineWidth;
        this.ctx.strokeStyle = this.border.getColor();
        this.ctx.fillStyle = this.backgroundColor.getColor();
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = this.fillStyle.getColor();
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.inputText.getText(), this.x + padding, this.y + this.height/2, this.width - padding*2);
    }

    public printText(){
        let padding = this.getPaddingInPx();

        this.ctx.font = this.font;
        this.ctx.fillStyle = this.backgroundColorFocus.getColor();
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);

        this.ctx.fillStyle = this.fillStyle.getColor();
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.inputText.getText(), this.x + padding, this.y + this.height/2, this.width - padding*2);
    }

}