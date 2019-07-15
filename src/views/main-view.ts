import { View } from "./view";
import { Panel } from "../models/panel";
import { Rgb } from "../models/rgb";

export class MainView extends View {
    public helloPanel = new Panel;

    constructor(){
        super();
        this.setPropertiesHelloPanel();
    }

    setPropertiesHelloPanel() {
        this.helloPanel.x = 400;
        this.helloPanel.y = 75;
        this.helloPanel.width = 300;
        this.helloPanel.height = 100;
        this.helloPanel.backgroundColor = new Rgb(255, 255, 255);
        this.helloPanel.border = new Rgb(255, 255, 255);
        this.registerControl(this.helloPanel);
    }
}