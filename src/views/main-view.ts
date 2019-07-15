import { View } from "./view";
import { Button } from "../models/button";
import { Panel } from "../models/panel";
import { Input } from "../models/input";
import { Rgb } from "../models/rgb";

export class MainView extends View {
    public helloButton = new Button;
    constructor(){
        super();
        this.setPropertiesHelloButton();
    }

    setPropertiesHelloButton() {
        this.helloButton.text = "helloButton";
        this.helloButton.x = 150;
        this.helloButton.y = 150;
        this.helloButton.width = 150;
        this.helloButton.height = 100;
        this.helloButton.backgroundColor = new Rgb(0,200,0);
        this.registerControl(this.helloButton);
    }

    private hB() {
        let but = new Button();
        but.x = 50;
        but.y = 50;
        but.width = 150;
        but.height = 100;
        but.backgroundColor = new Rgb(200,0,100);
        this.registerControl(but);
    }
    private hB2() {
        let but = new Button();
        but.x = 100;
        but.y = 100;
        but.width = 150;
        but.height = 100;
        but.backgroundColor = new Rgb(0,0,250);
        this.registerControl(but);
    }

    private firstPanelAndBlaButton(){
        let panel = new Panel();
        panel.x = 200;
        panel.y = 200;
        panel.width = 400;
        panel.height = 400;
        panel.backgroundColor = new Rgb(20,100,200);
        this.registerControl(panel);

        let but = new Button();
        but.x = 0;
        but.y = 0;
        but.width = 500;
        but.height = 50;
        but.backgroundColor = new Rgb(250,0,0);
        but.setParent(panel);

        //but.mouseup = this.controller.changeColorToRed.bind(this.controller, but);
        //but.mousedown = this.controller.changeColorToGrey.bind(this.controller, but);

        but.recalcPosition(but.x, but.y, but.width, but.height, panel);
        this.registerControl(but);

        let firstInput = new Input();
        firstInput.x = 0;
        firstInput.y = 0;
        firstInput.width = 200;
        firstInput.height = 100;
        firstInput.backgroundColor = new Rgb(200,200,200);
        firstInput.setParent(panel);

        firstInput.backgroundColorFocus = new Rgb(255,255,255);
        firstInput.borderFocus = new Rgb(100,100,100);

        firstInput.recalcPosition(firstInput.x, firstInput.y, firstInput.width, firstInput.height, panel);
        //this.registerControl(firstInput);

        let secondInput = new Input();
        secondInput.x = 0;
        secondInput.y = 300;
        secondInput.width = 300;
        secondInput.height = 50;
        secondInput.backgroundColorFocus = new Rgb(100,100,200);
        secondInput.setParent(panel);

        secondInput.recalcPosition(secondInput.x, secondInput.y, secondInput.width, secondInput.height, panel);
        //this.registerControl(secondInput);
    }
}