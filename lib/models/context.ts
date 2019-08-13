export class Context {
    private canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
    public ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    public width: number;
    public height: number;

    constructor(){
        this.canvas.width = 1000;
        this.canvas.height = 1000;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
}