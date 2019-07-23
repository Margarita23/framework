import { WrapperView } from "./wrapper-view";
import { MainView } from "../main-page/main-view";
import { MainController } from "../main-page/main-controller";
import { Application } from "../../models/application";
import { View } from "../../models/view";
import { Panel } from "../../controls/panel";
import { ContactsView } from "../contacts-page/contacts-view";
import { ContactsController } from "../contacts-page/contacts-controller";
import { MapsView } from "../maps-page/maps-view";
import { MapsController } from "../maps-page/maps-controller";
import { Button } from "../../controls/button";

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

        this.view.footer.mousemove = this.changeSizeOrPosition.bind(this.view.footer, 0, 850, this.view.footer.width, 150, this);
        this.view.footer.mouseleave = this.changeSizeOrPosition.bind(this.view.footer, 0, 950, this.view.footer.width, 50, this);

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
        const mapsView = new MapsView();
        const mapsContr = new MapsController(mapsView);
        (Application.getInstance()).unsubsrc(layoutView);

        (Application.getInstance()).unsubsrc(oldView);
        (Application.getInstance()).run(mapsView);
        (Application.getInstance()).run(layoutView);
    }

    public changeSizeOrPosition(x: number, y: number, width?: number, height?: number, controller?: WrapperController){
        if(this instanceof Panel){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.draw(controller.view.ctx);
        }
    }
}