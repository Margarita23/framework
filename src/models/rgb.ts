export class Rgb {
    private red: number;
    private green: number;
    private blue: number;
    private alpha: number;

    constructor(red: number, green: number, blue: number, alpha?:number){
        this.red = this.setColor(red);
        this.green = this.setColor(green);
        this.blue = this.setColor(blue);
        this.alpha = this.setAlpha(alpha);
    }

    private setColor(color: number): number {
        let res;
        if(color < 0) {
            res = 0;
        } else if (color > 255) {
            res = 255;
        } else {
            res = color;
        }
        return res;
    }

    private setAlpha(alpha: number): number {
        let res;
        if(alpha < 0) {
            res = 0;
        } else if (alpha > 1 || alpha == null) {
            res = 1;
        } else {
            res = alpha;
        }
        return res;
    }

    public getColor(): string {
        let color = "rgba(".concat((this.red).toString(), ",", (this.green).toString(), ",", (this.blue).toString(), ",", (this.alpha).toString(),")");
        return color;
    }
}