import { Control } from "./control";
import { Panel } from "./panel";
import { InputText } from "./inputText";

export class Input extends Panel {
    public focus: boolean = false;
    public inputText: InputText;
    public font: string = "30px Arial";
    public fillStyle: string = "rgb(0,0,0)";

    public padding: number = 5;

    public backgroundImageFocus: HTMLImageElement | null;
    public backgroundColorFocus: string | null;
    public borderFocus: string | null;
    public borderLineWidthFocus: number;
    public click: () => void = () => this.focusOnMe();

    constructor(x: number, y: number, width: number, height: number, backgroundImage: HTMLImageElement | null,
        backgroundColor: string | null, border: string | null,
        borderLineWidth: number, zOrder: number, parent: Control,
        ctx: CanvasRenderingContext2D, inputText: InputText,
        font: string, fillStyle: string, padding: number,
        backgroundImageFocus: HTMLImageElement | null,
        backgroundColorFocus: string | null, borderFocus: string | null,
        borderLineWidthFocus: number) {

        super(x, y, width, height, backgroundImage, backgroundColor, border, borderLineWidth, zOrder, parent, ctx);
        this.inputText = inputText;
        this.font = font;
        this.fillStyle = fillStyle;

        this.padding = (padding * this.width / 100) / 2;

        this.backgroundImageFocus = backgroundImageFocus;
        this.backgroundColorFocus = backgroundColorFocus;
        this.borderFocus = borderFocus;
        this.borderLineWidthFocus = borderLineWidthFocus;
    }

    public draw() {
        super.draw();
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.inputText.getText(), this.x + this.padding/2, this.y + this.height/2, this.width - this.padding);
    }

    public focusOnMe(): void {
        this.focus = true;
        this.ctx.font = this.font;
        this.ctx.lineWidth = this.borderLineWidth;
        this.ctx.strokeStyle = this.borderFocus;
        this.ctx.fillStyle = this.backgroundColorFocus;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.inputText.getText(), this.x + this.padding/2, this.y + this.height/2, this.width - this.padding);
    }

    public unfocus(): void {
        this.focus = false;
        this.ctx.font = this.font;
        this.ctx.lineWidth = this.borderLineWidth;
        this.ctx.strokeStyle = this.border;
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.inputText.getText(), this.x + this.padding/2, this.y + this.height/2, this.width - this.padding);
    }

    public printText(){
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.backgroundColorFocus;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);

        this.ctx.strokeStyle = "rgb(0,200,0)";
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);

        this.ctx.fillStyle = this.fillStyle;
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.inputText.getText(), this.x + this.padding/2, this.y + this.height/2, this.width - this.padding);
    }

}