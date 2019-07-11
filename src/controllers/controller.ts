import { View } from "../models/view";

export class Controller {
    public view: View;
    public controllers: Controller[] = [];
    public localController: Controller;
    constructor(){}

    public trueView(view: View): void{
        this.view = view;
    }
}