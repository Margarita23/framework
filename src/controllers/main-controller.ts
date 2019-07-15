import { MainView } from "../views/main-view";
import { ContactsView } from "../views/contacts-view";
import { ContactsController } from "./contacts-controller";
import { Application } from "../models/application";

export class MainController{
public view: MainView;
    constructor(view: MainView){
        this.view = view;
        (<MainView>this.view).helloButton.click = this.sayHi.bind((<MainView>this.view).helloButton);
        (<MainView>this.view).contactsButtonPage.click = this.goToContactPage.bind((<MainView>this.view).contactsButtonPage, this.view);
    }

    private goToContactPage(oldView: MainView): void{
        const contactsView = new ContactsView();
        const contactsContr = new ContactsController(contactsView);
        (Application.getInstance()).unsubsrc(oldView);
        (Application.getInstance()).run(contactsView);
    }

    public sayHi(){
        console.log("Hiii!!!");
    }

    public sayBye(){
        console.log('Bye');
    }

    public saySome(){
        console.log('Blah-blah-blah');
    }
}