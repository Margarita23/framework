export class Rgb {
    private _red: number = 0;
    private _green: number = 0;
    private _blue: number = 0;
    private alpha: number = 1;

    constructor(red: number, green: number, blue: number, alpha?:number | any){
        this.red = this.setColor(red);
        this.green = this.setColor(green);
        this.blue = this.setColor(blue);
        this.alpha = this.setAlpha(alpha);
    }

    get red(): number{ return this._red; }
    set red(newRed: number) {
        this._red = this.setColor(newRed);
    }

    get green(): number{ return this._green; }
    set green(newGreen: number) {
        this._green = this.setColor(newGreen);
    }

    get blue(): number{ return this._blue; }
    set blue(newBlue: number) {
        this._blue = this.setColor(newBlue);
    }

    public setColor(color: number): number {
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