export class Context {
    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public width: number;
    public height: number;

    constructor(){
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        this.canvas.width = 1000;
        this.canvas.height = 1000;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
}