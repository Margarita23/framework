import { ContactsView } from "../views/contacts-view";
import { Application } from "../models/application";
import { MainView } from "../views/main-view";
import { MainController } from "./main-controller";

export class ContactsController{
public view: ContactsView;
    constructor(view: ContactsView){
        this.view = view;
        const mainView = new MainView();
        const mainContr = new MainController(mainView);
        //const contactsView = new ContactsView();
        //const contactsContr = new ContactsController(contactsView);
        this.view.mainButtonPage.click = this.goToElsePage.bind((<ContactsView>this.view).mainButtonPage, this.view, mainContr);
    }

    public goToElsePage(oldView: ContactsView, controller: any): void{
        (Application.getInstance()).unsubsrc(oldView);
        (Application.getInstance()).run(controller.view);
    }
}