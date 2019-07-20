import { ContactsView } from "../views/contacts-view";
export class ContactsController{
    public view: ContactsView;
    public gamer: GamerProfile;

    constructor(view: ContactsView){
        this.view = view;
    }
}