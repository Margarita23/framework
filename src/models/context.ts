export class Context {
    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public width: number = document.body.offsetWidth;
    public height: number = document.body.offsetHeight;

    constructor(){
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
}