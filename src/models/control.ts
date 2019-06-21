export class Control {
    public controls: Control[] = [];
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public parent: Control;
    public backgroundImage: HTMLImageElement;
    public backgroundColor: string;
    public border: string;
    public zOrder: number;
    public click: () => void = () => {};

    constructor(x: number, y: number, width: number, height: number, backgroundImage: HTMLImageElement | null, backgroundColor: string | null, border: string | null, zOrder: number, parent?: Control){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.backgroundImage = backgroundImage;
        this.backgroundColor = backgroundColor;
        this.border = border;
        this.zOrder = zOrder;
        this.parent = parent;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        console.log('draw');
    }
}