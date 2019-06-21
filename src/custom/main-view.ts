import { View } from "../models/view";
import { Button } from "../models/button";
import { MainController } from "./main-controller";

export class MainView extends View{
    protected static instance = new MainView;
    private controller: MainController = new MainController();
    private constructor(){
        super();
        this.ctx.strokeStyle = "rgb(0,0,150)";
        this.ctx.strokeRect(0, 0, this.width, this.height);
    }

    public static getInstance(): MainView {
        return MainView.instance;
    }

    private helloButton() {
        let but = new Button(0, 0, 150, 100, null, "rgb(0,200,0)", null, 2, null, this.ctx);
        but.click = this.controller.sayHi;
        this.registerControl(but);
    }

    private hB() {
        let but = new Button(50, 50, 150, 100, null, "rgb(200,0,100)", null, 4, null, this.ctx);
        but.click = this.controller.sayHi;
        this.registerControl(but);
    }
    private hB2() {
        let but = new Button(100, 100, 150, 100, null, "rgb(0,0,250)", null, 3, null, this.ctx);
        but.click = this.controller.sayBye;
        this.registerControl(but);
    }

    private blaButton(){
        let but = new Button(0, 0, 400, 50, null, "rgb(250,0,0)", null, 1, null, this.ctx);
        but.mouseup = this.controller.changeColorToRed.bind(this.controller, but);
        but.mousedown = this.controller.changeColorToGrey.bind(this.controller, but);
        this.registerControl(but);
    }

    public run(): void{
        this.helloButton();
        this.hB();
        this.hB2();
        this.blaButton();
    }
}