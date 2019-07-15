import { View } from "./view";
import { Panel } from "../models/panel";

export class ContactsView extends View {

    public contactsInfo: Panel = new Panel();

    constructor(){
        super();
        this.contactsInfoProperties();
    }

    private contactsInfoProperties(){
        this.contactsInfo.x = 200;
        this.contactsInfo.y = 200;
        this.contactsInfo.width = 400;
        this.contactsInfo.height = 400;
        this.contactsInfo.innerText = "tel: 000-000-000";
        this.registerControl(this.contactsInfo);
    }
}
