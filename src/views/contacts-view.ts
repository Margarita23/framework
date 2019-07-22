import { View } from "./view";
import { Panel } from "../models/panel";
import { Button } from "../models/button";
import { Rgb } from "../models/rgb";

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
        this.contactsInfo.fillStyle = null;
        this.contactsInfo.border = null;
        this.contactsInfo.backgroundColor = null;
        this.registerControl(this.contactsInfo);

        let tel = new Panel();
        let mail = new Panel();
        let instagram = new Panel();
        tel.x = 0
        tel.y = 0;
        tel.width = 400;
        tel.innerText.text = "tel: 000-000-000";
        tel.border = null;
        tel.backgroundColor = null;
        tel.fillStyle = new Rgb(96, 160,122);
        tel.parent = this.contactsInfo;
        this.registerControl(tel);

        mail.x = 0;
        mail.y = 100;
        mail.width = 400;
        mail.innerText.text = "e-mail: tanks@gmail.com";
        mail.border = null;
        mail.backgroundColor = null;
        mail.fillStyle = new Rgb(96, 160,122);
        mail.parent = this.contactsInfo;
        this.registerControl(mail);

        instagram.x = 0;
        instagram.y = 200;
        instagram.width = 400;
        instagram.innerText.text = "instagram: instatanks";
        instagram.border = null;
        instagram.backgroundColor = null;
        instagram.fillStyle = new Rgb(96, 160,122);
        instagram.parent = this.contactsInfo;
        this.registerControl(instagram);
    }
}
