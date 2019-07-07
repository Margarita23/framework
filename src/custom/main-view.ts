import { View } from "../models/view";
import { Button } from "../models/button";
import { MainController } from "./main-controller";
import { Panel } from "../models/panel";
import { Input } from "../models/input";
import { InputText } from "../models/inputText";
import { Rgb } from "../models/rgb";

export class MainView extends View{
    protected static instance = new MainView;
    private controller: MainController = new MainController();
    private constructor(){
        super();
    }

    public static getInstance(): MainView {
        return MainView.instance;
    }

    private helloButton() {
        let but = new Button(2);
        but.width = 150;
        but.height = 100;
        but.backgroundColor = new Rgb(0,200,0);
        but.click = this.controller.sayHi;
        this.registerControl(but);
    }

    private hB() {
        let but = new Button(4);
        but.x = 50;
        but.y = 50;
        but.width = 150;
        but.height = 100;
        but.backgroundColor = new Rgb(200,0,100);

        but.click = this.controller.sayHi;
        this.registerControl(but);
    }
    private hB2() {
        let but = new Button(3);
        but.x = 100;
        but.y = 100;
        but.width = 150;
        but.height = 100;
        but.backgroundColor = new Rgb(0,0,250);
        but.click = this.controller.sayBye;
        this.registerControl(but);
    }

    private firstPanelAndBlaButton(){
        let panel = new Panel(3);
        panel.x = 200;
        panel.y = 200;
        panel.width = 400;
        panel.height = 400;
        panel.backgroundColor = new Rgb(20,100,200);
        this.registerControl(panel);

        let but = new Button(2);
        but.x = 0;
        but.y = 0;
        but.width = 500;
        but.height = 50;
        but.backgroundColor = new Rgb(250,0,0);
        but.parent = panel;
        
        //but.mouseup = this.controller.changeColorToRed.bind(this.controller, but);
        //but.mousedown = this.controller.changeColorToGrey.bind(this.controller, but);

        but.recalcPosition(but.x, but.y, but.width, but.height, panel);
        this.registerControl(but);

        let firstInput = new Input(1, new InputText("text", 16), "50px Arial", 20, 1);
        firstInput.x = 0;
        firstInput.y = 0;
        firstInput.width = 200;
        firstInput.height = 100;
        firstInput.backgroundColor = new Rgb(200,200,200);
        firstInput.parent = panel;

        firstInput.backgroundColorFocus = new Rgb(255,255,255);
        firstInput.borderFocus = new Rgb(100,100,100);

        firstInput.recalcPosition(firstInput.x, firstInput.y, firstInput.width, firstInput.height, panel);
        this.registerControl(firstInput);

        let secondInput = new Input(2, new InputText("Second input", 50), "20px Arial", 20, 1);
        secondInput.x = 0;
        secondInput.y = 300;
        secondInput.width = 300;
        secondInput.height = 50;
        secondInput.backgroundColorFocus = new Rgb(100,100,200);
        secondInput.parent = panel;
        
        secondInput.recalcPosition(secondInput.x, secondInput.y, secondInput.width, secondInput.height, panel);
        this.registerControl(secondInput);
    }

    public run(): void{
        this.helloButton();
        this.hB();
        this.hB2();
        this.firstPanelAndBlaButton();
    }
}