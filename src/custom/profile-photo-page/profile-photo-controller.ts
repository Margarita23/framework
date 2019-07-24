import { ProfilePhotoView } from "./profile-photo-view";
import { Button } from "../../controls/button";
import { Panel } from "../../controls/panel";
export class ProfilePhotoController {
    public view: ProfilePhotoView;
    public gamer: GamerProfile;

    constructor(view: ProfilePhotoView){
        this.view = view;
        this.view.photosContainer.widgetVertical.click = this.scrollVerticalWidget.bind(this.view.photosContainer.widgetVertical);
    }

    private scrollVerticalWidget(controller: ProfilePhotoController): void{
        if(this instanceof Button && this.parent instanceof Panel){
            this.parent.fix = !this.parent.fix;
            
            console.log(this.parent.fix);
        }
    }

    //private changePos(): void {

    //}

}