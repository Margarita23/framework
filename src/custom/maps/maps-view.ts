import { View } from "../../models/view";
import { Panel } from "../../controls/panel";
import { Rgb } from "../../models/rgb";
import { Button } from "../../controls/button";
import { TextAlight } from "../../models/text-alight";

export class MapsView extends View {

    public mapsTitle: Panel = new Panel();
    public mapsInfo: Panel = new Panel();

    constructor(){
        super();
        this.setMapsTitle();
        this.mapsInfoProperties();
        this.setSomeMaps();
    }

    setMapsTitle() {
        this.mapsTitle.innerText.text = "Choose Map";
        this.mapsTitle.y = 75;
        this.mapsTitle.width = 1000;
        this.mapsTitle.height = 100;
        this.mapsTitle.name = "chooseMap";
        this.mapsTitle.textAlight = TextAlight.Center;
        this.mapsTitle.backgroundColor = null;
        this.mapsTitle.border = null;
        this.registerControl(this.mapsTitle);
    }

    private mapsInfoProperties(){
        this.mapsInfo.name = "Maps";
        this.mapsInfo.x = 25;
        this.mapsInfo.y = 200;
        this.mapsInfo.width = 950;
        this.mapsInfo.height = 750;
        this.mapsInfo.border = new Rgb(200, 200, 200);
        this.mapsInfo.fillStyle = new Rgb(200, 200, 200);
        this.mapsInfo.backgroundColor = new Rgb(50, 50, 50);
        this.mapsInfo.isScroll = true;
        this.mapsInfo.wholeHeight = 1500;
        this.registerControl(this.mapsInfo.widgetVertical);
        this.registerControl(this.mapsInfo);

        let tel = new Panel();
        tel.x = 50
        tel.y = 100;
        tel.name = "telephone";
        tel.innerText.text = "tel: 000-000-000";
        tel.border = null;
        tel.backgroundColor = null;
        tel.fillStyle = new Rgb(50, 50, 50);
        tel.parent = this.mapsInfo;
        this.registerControl(tel);
    }

    setSomeMaps(){
        for(let i=0; i < 4; i++){
            for(let j=0; j < 8; j++){
                let butt = new Button();
                butt.x = 200*i + 50;
                butt.y = 200*j + 50;
                butt.name = "button";
                butt.parent = this.mapsInfo;
                this.registerControl(butt);
            }
        }

    }
}