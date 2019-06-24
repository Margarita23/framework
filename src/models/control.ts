export class Control {
    public controls: Control[] = [];
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public parent: Control;
    public ctx: CanvasRenderingContext2D;
    public backgroundImage: HTMLImageElement;
    public backgroundColor: string;
    public border: string;
    public borderLineWidth: number;
    public zOrder: number;
    public click: () => void = () => {};
    public mouseup: () => void = () => {};
    public mousedown: () => void = () => {};
    public mousemove: () => void = () => {};

    constructor(x: number, y: number, width: number, height: number, backgroundImage: HTMLImageElement | null, backgroundColor: string | null, border: string | null, borderLineWidth: number, zOrder: number, parent: Control, ctx: CanvasRenderingContext2D){
        this.x = parent != null ? x + parent.x : x;
        this.y = parent != null ? y + parent.y : y;

        if(parent && (x+width) > parent.width) {
            this.width = parent.width - x;
            this.height = height;
        }
        else if(parent && (y+height) > parent.height) {
            this.height = parent.height - y;
            this.width = width;
        }
        else {
            this.width = width;
            this.height = height;
        }
        this.backgroundImage = backgroundImage;
        this.backgroundColor = backgroundColor;
        this.border = border;
        this.borderLineWidth = borderLineWidth;
        this.zOrder = zOrder;
        this.parent = parent;
        this.ctx = ctx;
    }

    draw(): void {
        console.log('draw');
    }
}