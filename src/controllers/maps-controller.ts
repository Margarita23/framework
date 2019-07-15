import { Application } from "../models/application";
import { MainView } from "../views/main-view";
import { MainController } from "./main-controller";
import { MapsView } from "../views/maps-view";
import { ContactsView } from "../views/contacts-view";
import { ContactsController } from "./contacts-controller";

export class MapsController {
    public view: MapsView;
    public gamer: GamerProfile;

    constructor(view: MapsView, gamer?: GamerProfile){
        this.view = view;
        const mainView = new MainView();
        let mainContr: MainController = null;
        if(gamer){
            this.gamer = gamer;
            mainContr = new MainController(mainView, this.gamer);
        } else {
            mainContr = new MainController(mainView);
        }
        this.view.mainButtonPage.click = this.goToMainPage.bind((<MapsView>this.view).mainButtonPage, this.view, gamer);
        this.view.contactsButtonPage.click = this.goToContactPage.bind((<MapsView>this.view).contactsButtonPage, this.view, this.gamer);
    }

    private goToMainPage(old: MapsView, gamer: GamerProfile): void{
        const mainView = new MainView();
        const mainContr = new MainController(mainView, gamer);
        (Application.getInstance()).unsubsrc(old);
        (Application.getInstance()).run(mainView);
    }

    private goToContactPage(oldView: MainView, gamer?: GamerProfile): void{
        const contactsView = new ContactsView();
        const contactsContr = new ContactsController(contactsView, gamer);
        (Application.getInstance()).unsubsrc(oldView);
        (Application.getInstance()).run(contactsView);
    }
}