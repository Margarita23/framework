import { View } from "./view";
import { Panel } from "../models/panel";
import { Button } from "../models/button";

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
        this.registerControl(this.contactsInfo);

        let tel = new Button();
        let mail = new Button();
        let instagram = new Button();
        tel.x = 0
        tel.y = 0;
        tel.width = 400;
        tel.text = "tel: 000-000-000";
        tel.border = null;
        tel.backgroundColor = null;
        tel.parent = this.contactsInfo;
        this.registerControl(tel);

        mail.x = 0;
        mail.y = 100;
        mail.width = 400;
        mail.text = "e-mail: tanks@gmail.com";
        mail.border = null;
        mail.backgroundColor = null;
        mail.parent = this.contactsInfo;
        this.registerControl(mail);

        instagram.x = 0;
        instagram.y = 200;
        instagram.width = 400;
        instagram.text = "instagram: instatanks";
        instagram.border = null;
        instagram.backgroundColor = null;
        instagram.parent = this.contactsInfo;
        this.registerControl(instagram);
    }
}
