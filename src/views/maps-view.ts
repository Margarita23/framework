import { Panel } from "../models/panel";
import { Rgb } from "../models/rgb";
import { View } from "./view";

export class MapsView extends View{
    public mapsTitle = new Panel;
    public mapsContainer = new Panel;

    constructor(){
        super();
        this.setPropertiesMapsTitle();
        this.setMapsContainerProperties();
    }

    setPropertiesMapsTitle() {

        this.mapsTitle.innerText = "Choose maps";
        this.mapsTitle.x = 400;
        this.mapsTitle.y = 75;
        this.mapsTitle.width = 300;
        this.mapsTitle.height = 100;
        this.mapsTitle.backgroundColor = new Rgb(255, 255, 255);
        this.mapsTitle.border = new Rgb(255, 255, 255);
        this.registerControl(this.mapsTitle);
    }

    private setMapsContainerProperties(){
        this.mapsContainer.x = 0;
        this.mapsContainer.y = 200;
        this.mapsContainer.width = 1000;
        this.mapsContainer.height = 800;
        this.mapsContainer.backgroundColor = new Rgb(200, 200, 200);
        this.registerControl(this.mapsContainer);
    }

    private createShowingLittleMaps(){
        let map = new Panel;
        map.x = 0;
        map.y = 200;
        map.width = 200;
        map.height = 150;
        map.border = new Rgb(255, 255, 255);
        this.registerControl(this.mapsContainer);
    }
}