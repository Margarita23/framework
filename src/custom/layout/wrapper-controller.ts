import { WrapperView } from "./wrapper-view";
import { MainView } from "../main-page/main-view";
import { MainController } from "../main-page/main-controller";
import { Application } from "../../models/application";
import { View } from "../../models/view";
import { Panel } from "../../controls/panel";
import { ContactsView } from "../contacts-page/contacts-view";
import { ContactsController } from "../contacts-page/contacts-controller";
import { ProfilePhotoView } from "../profile-photo-page/profile-photo-view";
import { ProfilePhotoController } from "../profile-photo-page/profile-photo-controller";

export class WrapperController {
    public otherView: View;
    public view: WrapperView;
    public gamer: GamerProfile;

    constructor(view: WrapperView, otherView: View, gamer?: GamerProfile){
        this.otherView = otherView;
        this.view = view;
        this.gamer = gamer;

        this.view.mainButtonPage.click = this.goToMainPage.bind(this.view.contactsButtonPage, this.view, this.otherView, this);
        this.view.contactsButtonPage.click = this.goToContactPage.bind(this.view.contactsButtonPage, this.view, this.otherView);
        this.view.playButtonPage.click = this.goToMapsPage.bind(this.view.contactsButtonPage, this.view, this.otherView);

        this.view.mainButtonPage.mousemove = this.view.controlHover.bind(this.view, this.view.mainButtonPage);
        this.view.mainButtonPage.mouseover = this.view.controlNotHover.bind(this.view, this.view.mainButtonPage);

        this.view.contactsButtonPage.mousemove = this.view.controlHover.bind(this.view, this.view.contactsButtonPage);
        this.view.contactsButtonPage.mouseover = this.view.controlNotHover.bind(this.view, this.view.contactsButtonPage);

        this.view.playButtonPage.mousemove = this.view.controlHover.bind(this.view, this.view.playButtonPage);
        this.view.playButtonPage.mouseover = this.view.controlNotHover.bind(this.view, this.view.playButtonPage);
    }

    public goToMainPage(layoutView: WrapperView, oldView: View, controller?: WrapperController): void{
        const mainView = new MainView();
        const mainContr = new MainController(mainView, controller ? controller : this);
        (Application.getInstance()).unsubsrc(layoutView);

        (Application.getInstance()).unsubsrc(oldView);
        (Application.getInstance()).run(mainView);
        (Application.getInstance()).run(layoutView);
    }

    private goToContactPage(layoutView: WrapperView, oldView: View): void{
        const contactsView = new ContactsView();
        const contactsContr = new ContactsController(contactsView);
        (Application.getInstance()).unsubsrc(layoutView);

        (Application.getInstance()).unsubsrc(oldView);
        (Application.getInstance()).run(contactsView);
        (Application.getInstance()).run(layoutView);
    }

    private goToMapsPage(layoutView: WrapperView, oldView: View): void{
        const profilePhotosView = new ProfilePhotoView();
        const profilePhotosContr = new ProfilePhotoController(profilePhotosView);
        (Application.getInstance()).unsubsrc(layoutView);

        (Application.getInstance()).unsubsrc(oldView);
        (Application.getInstance()).run(profilePhotosView);
        (Application.getInstance()).run(layoutView);
    }
}