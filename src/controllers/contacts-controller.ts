import { ContactsView } from "../views/contacts-view";
import { MainView } from "../views/main-view";
import { MainController } from "./main-controller";
import { WrapperView } from "../views/wrapper-view";
import { WrapperController } from "./wrapper-controller";
export class ContactsController{
    public view: ContactsView;
    public gamer: GamerProfile;

    constructor(view: ContactsView){
        this.view = view;
    }
}