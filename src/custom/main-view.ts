import { View } from "../models/view";
import { Button } from "../models/button";
import { MainController } from "./main-controller";
import { Panel } from "../models/panel";
import { Input } from "../models/input";

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
        let but = new Button(0, 0, 150, 100, null, "rgb(0,200,0)", null,1, 2, null, this.ctx);
        but.click = this.controller.sayHi;
        this.registerControl(but);
    }

    private hB() {
        let but = new Button(50, 50, 150, 100, null, "rgb(200,0,100)", null,1, 4, null, this.ctx);
        but.click = this.controller.sayHi;
        this.registerControl(but);
    }
    private hB2() {
        let but = new Button(100, 100, 150, 100, null, "rgb(0,0,250)", null,1, 3, null, this.ctx);
        but.click = this.controller.sayBye;
        this.registerControl(but);
    }

    private firstPanelAndBlaButton(){
        let panel = new Panel(200, 200, 400, 400, null, "rgb(20,100,200)", "rgb(0,0,0)",1, 3, null, this.ctx);
        this.registerControl(panel);


        let but = new Button(0, 0, 500, 50, null, "rgb(250,0,0)", null,1, 2, panel, this.ctx);
        //Ошибка!!! При смене цвета кнопки, перерисовка производится ПОВЕРХ остальных кнопок! Решить.
        but.mouseup = this.controller.changeColorToRed.bind(this.controller, but);
        but.mousedown = this.controller.changeColorToGrey.bind(this.controller, but);
        this.registerControl(but);

        let firstInput = new Input(0, 0, 200, 100, null, "rgb(200,200,200)", "rgb(0,0,0)",1, 1, panel, this.ctx, "FIRST input", "50px Arial", "rgb(0,200,100)", null, "rgb(255,20,200)", "rgb(0,0,0)",1);
        this.registerControl(firstInput);

        let secondInput = new Input(0, 300, 300, 50, null, "rgb(100,100,100)", "rgb(0,0,0)",1, 2, panel, this.ctx, "Second input", "50px Arial", "rgb(0,200,100)", null, "rgb(100,100,100)", "rgb(0,0,0)",1);
        this.registerControl(secondInput);
        
    }


    public run(): void{
        this.helloButton();
        this.hB();
        this.hB2();
        this.firstPanelAndBlaButton();
    }
}