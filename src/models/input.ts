import { Control } from "./control";
import { Panel } from "./panel";

export class Input extends Panel {
    public focus: boolean = false;
    public text: string = "";
    public font: string = "30px Arial";
    public fillStyle: string = "rgb(0,0,0)";
    public backgroundImageFocus: HTMLImageElement | null;
    public backgroundColorFocus: string | null;
    public borderFocus: string | null;
    public borderLineWidthFocus: number;
    public click: () => void = () => this.focusOnMe();

    constructor(x: number, y: number, width: number, height: number, backgroundImage: HTMLImageElement | null, backgroundColor: string | null, border: string | null, borderLineWidth: number, zOrder: number, parent: Control, ctx: CanvasRenderingContext2D, text: string, font: string, fillStyle: string,
        backgroundImageFocus: HTMLImageElement | null, backgroundColorFocus: string | null, borderFocus: string | null, borderLineWidthFocus: number){
        super(x, y, width, height, backgroundImage, backgroundColor, border, borderLineWidth, zOrder, parent, ctx);
        this.text = text;
        this.font = font;
        this.fillStyle = fillStyle;

        this.backgroundImageFocus = backgroundImageFocus;
        this.backgroundColorFocus = backgroundColorFocus;
        this.borderFocus = borderFocus;
        this.borderLineWidthFocus = borderLineWidthFocus;
    }

    public draw() {
        super.draw();
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.fillText(this.text, this.x, this.y + this.height);
    }

    public focusOnMe(): void{
        this.focus = true;
        this.ctx.lineWidth = this.borderLineWidth;
        this.ctx.strokeStyle = "rgb(255,255,0)";
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    public unfocus(): void{
        this.focus = false;
        this.ctx.strokeStyle = this.border;
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}