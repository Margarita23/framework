import { MainView } from "../views/main-view";
import { ContactsView } from "../views/contacts-view";
import { ContactsController } from "./contacts-controller";
import { Application } from "../models/application";
import { MapsView } from "../views/maps-view";
import { MapsController } from "./maps-controller";
import { Rgb } from "../models/rgb";
import { Control } from "../models/control";

export class MainController{
public view: MainView;
public gamer: GamerProfile;
    constructor(view: MainView, gamer?: GamerProfile){
        this.view = view;
        if(gamer){
            this.gamer = gamer;
            this.view.helloPanel.innerText = "Hello, " + this.gamer.login + " !";
        } else {
            this.view.helloPanel.innerText = "Hello!";
        }
        this.view.contactsButtonPage.click = this.goToContactPage.bind(this.view.contactsButtonPage, this.view, this.gamer);
        this.view.playButtonPage.click = this.goToMapsPage.bind(this.view.contactsButtonPage, this.view, this.gamer);

        this.clickEffectsForButtons(this.view.contactsButtonPage);
        this.clickEffectsForButtons(this.view.playButtonPage);
        this.view.playButtonPage.mousedown = this.goToMapsPage.bind(this.view.contactsButtonPage, this.view, this.gamer);
    }

    private clickEffectsForButtons(button: Control){
        let lastColor = button.backgroundColor;
        button.mousedown = () => { button.backgroundColor = new Rgb(240,240,240); button.draw(this.view.ctx); };
        button.mouseup = () => { button.backgroundColor = lastColor; button.draw(this.view.ctx); };
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