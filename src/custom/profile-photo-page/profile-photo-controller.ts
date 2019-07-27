import { ProfilePhotoView } from "./profile-photo-view";
import { Button } from "../../controls/button";
import { Panel } from "../../controls/panel";
import { WrapperController } from "../layout/wrapper-controller";

export class ProfilePhotoController {
    public view: ProfilePhotoView;
    public gamer: GamerProfile;

    constructor(view: ProfilePhotoView, layoutController: WrapperController){
        this.view = view;
        //this.view.draw(this.view.photosContainer.controls, this.view.ctx);

        let gamer = layoutController.gamer;
        if(gamer){
            this.gamer = gamer;
        }

        this.view.photosContainer.widgetVertical.click = this.scrollVerticalWidget.bind(this.view.photosContainer.widgetVertical);
        for(let i = 0; i < this.view.photosContainer.controls.length; i++){
            if(this.view.photosContainer.controls[i].name.includes("photo")){
                this.view.photosContainer.controls[i].click = this.showPhotos.bind(this.view.photosContainer.controls[i], i, this);
                this.view.photosContainer.controls[i].mousemove = this.view.whenPhotoHover.bind(this.view, this.view.photosContainer.controls[i]);
            }
        }
        this.view.photosContainer.controls.forEach((c, index) => {
            c.click = this.showPhotos.bind(c, index, this);
        });
    }

    private scrollVerticalWidget(): void{
        if(this instanceof Button && this.parent instanceof Panel){
            this.parent.fix = !this.parent.fix;
        }
    }

    private showPhotos(index: number, controller: ProfilePhotoController){
        let buffPanel = new Panel();

        buffPanel.x = 175;
        buffPanel.y = 0;
        buffPanel.width = 750;
        buffPanel.height = 600;

        if(this instanceof Button){
            controller.gamer.photo = this.name;
            controller.view.profilePageTitle.innerText.text = this.name;
        }
        let p = controller.view.profilePageTitle;
    }
}