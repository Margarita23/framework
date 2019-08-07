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
        this.photosContainer.x = 50;
        this.photosContainer.y = 200;
        this.photosContainer.width = 800;
        this.photosContainer.height = 600;
        this.photosContainer.name = "mapsContainer";
        this.photosContainer.backgroundColor = new Rgb(50, 50, 50);
        this.photosContainer.isScroll = true;
        this.photosContainer.wholeHeight = 1200;
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
        photo.x = 250*i + 50;
        photo.y = 250*j + 50;
        photo.width = 200;
        photo.height = 200;
        photo.name = "photo" + i + j;
        photo.backgroundImage = this.images.get(photo.name);
        photo.backgroundColor = new Rgb(50, 50, 50);
        photo.border = new Rgb(200, 200, 200);
        photo.text = null;
        photo.parent = this.photosContainer;
        this.registerControl(photo);
    }
}