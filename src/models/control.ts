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
    public zOrder: number;
    public click: () => void = () => {};
    public mouseup: () => void = () => {};
    public mousedown: () => void = () => {};
    public mousemove: () => void = () => {};

    constructor(x: number, y: number, width: number, height: number, backgroundImage: HTMLImageElement | null, backgroundColor: string | null, border: string | null, zOrder: number, parent: Control, ctx: CanvasRenderingContext2D){
        this.x = parent != null ? x + parent.x : x;
        this.y = parent != null ? y + parent.y : y;

        if(parent && width > parent.width) {
            this.width = parent.width;
            this.height = height;
        }
        else if(parent && height > parent.height) {
            this.height = parent.height;
            this.width = width;
        }
        else {
            this.width = width;
            this.height = height;
        }
        this.backgroundImage = backgroundImage;
        this.backgroundColor = backgroundColor;
        this.border = border;
        this.zOrder = zOrder;
        this.parent = parent;
        this.ctx = ctx;
    }

    draw(): void {
        console.log('draw');
    }
}