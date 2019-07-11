import { View } from "../models/view";
import { Context } from "../models/context";

export class Controller {
    public view: View;
    public ctx: Context = new Context();
    constructor(){}

    public run(): void{
        this.view.run();
        this.view.draw(this.ctx);
    }
}