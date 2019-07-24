import { Panel } from "../../controls/panel";
import { Rgb } from "../../models/rgb";
import { View } from "../../models/view";

export class MapsView extends View{
    public mapsContainer: Panel = new Panel();

    constructor(){
        super();
        let mapsTitle = new Panel();
        this.setPropertiesMapsTitle(mapsTitle);
        this.setMapsContainerProperties();
    }

    setPropertiesMapsTitle(mapsTitle: Panel) {
        mapsTitle.innerText.text = "Choose maps";
        mapsTitle.x = 400;
        mapsTitle.y = 75;
        mapsTitle.width = 300;
        mapsTitle.height = 100;
        mapsTitle.backgroundColor = null;
        mapsTitle.border = null;
        this.registerControl(mapsTitle);
    }

    private setMapsContainerProperties(){
        this.mapsContainer.x = 0;
        this.mapsContainer.y = 200;
        this.mapsContainer.width = 1000;
        this.mapsContainer.height = 600;
        this.mapsContainer.name = "mapsContainer";
        this.mapsContainer.backgroundColor = new Rgb(255,255,0, 0.5);
        this.registerControl(this.mapsContainer);

        for(let i=0; i < 3; i ++){
            for(let j=0; j < 5; j ++){
                this.createShowingLittleMaps(i, j);
            }
        }
    }

    private createShowingLittleMaps(i: number, j: number){
        let map = new Panel;
        map.x = 200*i + 100;
        map.y = 200*j + 100;
        map.width = 200;
        map.height = 200;
        map.name = "i = " + i + "; j = " + j;
        map.parent = this.mapsContainer;
        this.registerControl(map);
    }
}