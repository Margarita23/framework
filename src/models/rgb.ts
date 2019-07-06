export class Rgb {
    private red: number;
    private green: number;
    private blue: number;

    constructor(red: number, green: number, blue: number){
        this.red = this.setColor(red);
        this.green = this.setColor(green);
        this.blue = this.setColor(blue);
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

    public getColor(): string {
        let color = "rgb(".concat((this.red).toString(), ",", (this.green).toString(), ",", (this.blue).toString(), ")");
        return color;
    }
}