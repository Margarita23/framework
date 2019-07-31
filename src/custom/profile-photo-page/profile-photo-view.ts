import { Panel } from "../../controls/panel";
import { Rgb } from "../../models/rgb";
import { View } from "../../models/view";
import { Button } from "../../controls/button";
import { PhotoImagesStock } from "./photoImagesStock";

export class ProfilePhotoView extends View{
    public photosContainer: Panel = new Panel();
    public profilePageTitle: Panel = new Panel();
    public images: Map<string, HTMLImageElement> = (new PhotoImagesStock()).images;

    constructor(){
        super();
        this.setPropertiesTitle();
        this.setContainerProperties();
    }

    setPropertiesTitle() {
        this.profilePageTitle.innerText.text = "Choose photo";
        this.profilePageTitle.x = 400;
        this.profilePageTitle.y = 75;
        this.profilePageTitle.width = 300;
        this.profilePageTitle.height = 100;
        this.profilePageTitle.backgroundColor = null;
        this.profilePageTitle.border = null;
        this.registerControl(this.profilePageTitle);
    }

    public setContainerProperties(){
        this.photosContainer.x = 25;
        this.photosContainer.y = 200;
        this.photosContainer.width = 950;
        this.photosContainer.height = 800;
        this.photosContainer.name = "mapsContainer";
        this.photosContainer.backgroundColor = new Rgb(255,255,0, 0.5);
        this.photosContainer.isScroll = true;
        this.photosContainer.wholeHeight = 1500;
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
        photo.name = "photo" + i + j;
        photo.backgroundImage = this.images.get(photo.name);
        photo.text = null;
        photo.parent = this.photosContainer;
        this.registerControl(photo);
    }

    public whenPhotoHover(control: Button){
        control.backgroundColor = new Rgb(255, 200, 200);
        control.backgroundImage = this.images.get(control.name);
        control.draw(this.ctx);
    }
}