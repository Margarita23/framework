import { View } from "../../models/view";
import { Panel } from "../../controls/panel";
import { Rgb } from "../../models/rgb";

export class ContactsView extends View {

    public contactsInfo: Panel = new Panel();
    public images: Map<string, HTMLImageElement> = new Map();

    constructor(){
        super();
        this.contactsInfoProperties();
    }

    private contactsInfoProperties(){
        this.contactsInfo.x = 200;
        this.contactsInfo.y = 200;
        this.contactsInfo.width = 500;
        this.contactsInfo.height = 500;
        this.contactsInfo.fillStyle = new Rgb(0, 0, 0);
        this.contactsInfo.border = null;
        this.contactsInfo.backgroundColor = null;

        this.contactsInfo.backgroundImage = this.images.get("contacts-panel");

        this.registerControl(this.contactsInfo);

        let tel = new Panel();
        let mail = new Panel();
        let instagram = new Panel();
        tel.x = 50
        tel.y = 100;
        tel.width = 400;
        tel.innerText.text = "tel: 000-000-000";
        tel.border = null;
        tel.backgroundColor = null;
        tel.fillStyle = new Rgb(0, 0, 0);
        tel.parent = this.contactsInfo;
        this.registerControl(tel);

        mail.x = 50;
        mail.y = 200;
        mail.width = 400;
        mail.innerText.text = "e-mail: tanks@gmail.com";
        mail.border = null;
        mail.backgroundColor = null;
        mail.fillStyle = new Rgb(0, 0, 0);
        mail.parent = this.contactsInfo;
        this.registerControl(mail);

        instagram.x = 50;
        instagram.y = 300;
        instagram.width = 400;
        instagram.innerText.text = "instagram: instatanks";
        instagram.border = null;
        instagram.backgroundColor = null;
        instagram.fillStyle = new Rgb(0, 0, 0);
        instagram.parent = this.contactsInfo;
        this.registerControl(instagram);
    }
}
