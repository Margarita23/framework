import { View } from "../models/view";
import { Application } from "../models/application";

export class Controller {
    public view: View;
    public localController: Controller;

    constructor(view: View){
        this.view = view;
        this.run();
    }

    public run(): void {}
}