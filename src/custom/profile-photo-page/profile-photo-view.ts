import { Panel } from "../../controls/panel";
import { Rgb } from "../../models/rgb";
import { View } from "../../models/view";
import { Button } from "../../controls/button";

export class ProfilePhotoView extends View{
    public photosContainer: Panel = new Panel();

    constructor(){
        super();
        let profilePageTitle = new Panel();
        this.setPropertiesMapsTitle(profilePageTitle);
        this.setMapsContainerProperties();
    }

    setPropertiesMapsTitle(profilePageTitle: Panel) {
        profilePageTitle.innerText.text = "Choose maps";
        profilePageTitle.x = 400;
        profilePageTitle.y = 75;
        profilePageTitle.width = 300;
        profilePageTitle.height = 100;
        profilePageTitle.backgroundColor = null;
        profilePageTitle.border = null;
        this.registerControl(profilePageTitle);
    }

    private setMapsContainerProperties(){
        this.photosContainer.x = 25;
        this.photosContainer.y = 200;
        this.photosContainer.width = 950;
        this.photosContainer.height = 600;
        this.photosContainer.name = "mapsContainer";
        this.photosContainer.backgroundColor = new Rgb(255,255,0, 0.5);
        this.photosContainer.isScroll = true;
        this.registerControl(this.photosContainer.widgetVertical);
        this.registerControl(this.photosContainer);

        for(let i=0; i < 3; i ++){
            for(let j=0; j < 5; j ++){
                this.createShowingLittleMaps(i, j);
            }
        }
    }

    private createShowingLittleMaps(i: number, j: number){
        let photo = new Button;
        photo.x = 300*i + 50;
        photo.y = 300*j + 50;
        photo.width = 250;
        photo.height = 250;
        try {
            let im = new Image();
            im.src = require("../../assets/photo"+ i + j + ".svg");
            im.onload = () => {
                photo.backgroundImage = im;
            }
        } catch (error) {
            let im = new Image();
            im.src = require("../../assets/no-photo.svg");
            photo.backgroundImage = im;
            im.onload = () => {
                photo.backgroundImage = im;
            }
        }
        photo.name = "i = " + i + "; j = " + j;
        photo.parent = this.photosContainer;
        this.registerControl(photo);
    }
}