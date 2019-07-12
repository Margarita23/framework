import { ContactsView } from "../views/contacts-view";
import { View } from "../models/view";

export class ContactsController {
    public view: View = new ContactsView();

    constructor(view: View){
        this.view = <ContactsView>view;
    }
}