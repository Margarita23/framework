import { MainView } from "../views/main-view";
import { ContactsView } from "../views/contacts-view";
import { ContactsController } from "./contacts-controller";
import { Application } from "../models/application";
import { MapsView } from "../views/maps-view";
import { MapsController } from "./maps-controller";

export class MainController{
public view: MainView;
public gamer: GamerProfile;
    constructor(view: MainView, gamer?: GamerProfile){
        this.view = view;
        if(gamer){
            this.gamer = gamer;
            (<MainView>this.view).helloPanel.innerText = "Hello, " + this.gamer.login + " !";
        } else {
            (<MainView>this.view).helloPanel.innerText = "Hello!";
        }
        (<MainView>this.view).contactsButtonPage.click = this.goToContactPage.bind((<MainView>this.view).contactsButtonPage, this.view, this.gamer);
        (<MainView>this.view).playButtonPage.click = this.goToMapsPage.bind((<MainView>this.view).contactsButtonPage, this.view, this.gamer);
    }

    private goToContactPage(oldView: MainView, gamer?: GamerProfile): void{
        const contactsView = new ContactsView();
        const contactsContr = new ContactsController(contactsView, gamer);
        (Application.getInstance()).unsubsrc(oldView);
        (Application.getInstance()).run(contactsView);
    }

    private goToMapsPage(oldView: MainView, gamer?: GamerProfile): void{
        const mapsView = new MapsView();
        const mapsContr = new MapsController(mapsView, gamer);
        (Application.getInstance()).unsubsrc(oldView);
        (Application.getInstance()).run(mapsView);
    }

    public saySome(){
        console.log('Blah-blah-blah');
    }
}