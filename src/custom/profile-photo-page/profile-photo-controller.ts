import { ProfilePhotoView } from "./profile-photo-view";
import { Button } from "../../controls/button";
import { WrapperController } from "../layout/wrapper-controller";
import { Rgb } from "../../models/rgb";

export class ProfilePhotoController {
    public view: ProfilePhotoView;
    public gamer: GamerProfile;

    constructor(view: ProfilePhotoView, layoutController: WrapperController){
        this.view = view;

        let gamer = layoutController.gamer;
        if(gamer){ this.gamer = gamer; }

        for(let i = 0; i < this.view.photosContainer.controls.length; i++){
            if(this.view.photosContainer.controls[i].name.includes("photo")){
                this.view.photosContainer.controls[i].mousedown = this.whenPhotoDown.bind(this.view.photosContainer.controls[i], this);
                this.view.photosContainer.controls[i].click = this.setProfilePhoto.bind(this.view.photosContainer.controls[i], this);
            }
        }
    }

    private setProfilePhoto(controller: ProfilePhotoController){
        if(this instanceof Button){
            controller.gamer.photo = this.name;
            controller.view.profilePageTitle.innerText.text = this.name;
        }
    }

    public whenPhotoDown(controller: ProfilePhotoController){
        if(this instanceof Button){
            console.log(this.backgroundImage);

            //this.backgroundImage.onload = () => {
            //    if(this instanceof Button){
                    this.backgroundImage = controller.view.images.get(this.name);
                // }
            //}
            console.log(controller.view.images.get(this.name));
            this.backgroundColor = new Rgb(255, 200, 200);
            this.draw(controller.view.ctx);
        }
    }
}