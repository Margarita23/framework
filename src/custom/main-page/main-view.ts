import { View } from "../../models/view";
import { Panel } from "../../controls/panel";
import { Rgb } from "../../models/rgb";
import { MainImagesStock } from "./mainImagesStock";

export class MainView extends View {
    public helloPanel: Panel = new Panel();
    public photo: Panel = new Panel();
    public images: Map<string, HTMLImageElement> = (new MainImagesStock()).images;

    constructor(){
        super();
        this.setPropertiesHelloPanel();
        this.setPropertiesPhoto();
    }

    public setPropertiesHelloPanel() {
        this.helloPanel.x = 250;
        this.helloPanel.y = 150;
        this.helloPanel.width = 500;
        this.helloPanel.height = 100;
        this.helloPanel.backgroundColor = null;
        this.helloPanel.innerText.startX = this.helloPanel.width/2;
        this.helloPanel.innerText.align = "center";
        this.helloPanel.fillStyle = new Rgb(50, 50, 50);
        this.helloPanel.border = null;
        this.registerControl(this.helloPanel);
    }

    public setPropertiesPhoto(){
        this.photo.x = 250;
        this.photo.y = 250;
        this.photo.width = 500;
        this.photo.height = 500;
        this.photo.backgroundColor = null;
        this.photo.border = null;
        this.registerControl(this.photo);
    }
}