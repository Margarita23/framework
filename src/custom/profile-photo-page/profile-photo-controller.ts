import { ProfilePhotoView } from "./profile-photo-view";
import { Button } from "../../controls/button";
import { Panel } from "../../controls/panel";
export class ProfilePhotoController {
    public view: ProfilePhotoView;
    public gamer: GamerProfile;

    constructor(view: ProfilePhotoView){
        this.view = view;
        this.view.photosContainer.widgetVertical.click = this.scrollVerticalWidget.bind(this.view.photosContainer.widgetVertical);
        for(let i = 0; i < this.view.photosContainer.controls.length; i++){
            if(this.view.photosContainer.controls[i].name.includes("photo")){
                this.view.photosContainer.controls[i].click = this.showPhotos.bind(this.view.photosContainer.controls[i], i, this);
                this.view.photosContainer.controls[i].mousemove = this.view.whenPhotoHover.bind(this.view, this.view.photosContainer.controls[i]);
            }
        }
        //this.view.photosContainer.controls.forEach((c, index) => {
        //    c.click = this.showPhotos.bind(c, index, this);
        //});
    }

    private scrollVerticalWidget(): void{
        if(this instanceof Button && this.parent instanceof Panel){
            this.parent.fix = !this.parent.fix;
        }
    }

    private showPhotos(photo: Panel, index: number, controller: ProfilePhotoController){
        let buffPanel = new Panel();

        buffPanel.x = 175;
        buffPanel.y = 0;
        buffPanel.width = 750;
        buffPanel.height = 600;

        console.log(photo);
        //buffPanel.parent = photo.parent;
        console.log(controller);

        //controller.view.registerControl(buffPanel);
        console.log(photo.name);
    }

}