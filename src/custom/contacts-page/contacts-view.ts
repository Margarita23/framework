import { View } from "../../models/view";
import { Panel } from "../../controls/panel";
import { Rgb } from "../../models/rgb";
import { Button } from "../../controls/button";

export class ContactsView extends View {

    public contactsInfo: Panel = new Panel();
    public images: Map<string, HTMLImageElement> = new Map();

    constructor(){
        super();
        this.contactsInfoProperties();
    }

    private contactsInfoProperties(){
        this.contactsInfo.name = "Contacts";
        this.contactsInfo.x = 200;
        this.contactsInfo.y = 200;
        this.contactsInfo.width = 500;
        this.contactsInfo.height = 500;
        this.contactsInfo.border = null;
        this.contactsInfo.fillStyle = new Rgb(50, 50, 50);
        this.contactsInfo.backgroundColor = new Rgb(200, 200, 200);
        this.contactsInfo.backgroundImage = this.images.get("contacts-panel");

        this.contactsInfo.isScroll = true;
        this.contactsInfo.wholeHeight = 1500;
        this.registerControl(this.contactsInfo.widgetVertical);
        this.registerControl(this.contactsInfo);

        let tel = new Panel();
        let mail = new Panel();
        let instagram = new Panel();
        let butt = new Button();
        tel.x = 50
        tel.y = 100;
        tel.name = "telephone";
        tel.innerText.text = "tel: 000-000-000";
        tel.border = null;
        tel.backgroundColor = null;
        tel.fillStyle = new Rgb(50, 50, 50);
        tel.parent = this.contactsInfo;
        this.registerControl(tel);

        mail.x = 50;
        mail.y = 200;
        mail.width = 400;
        mail.name = "mail";
        mail.innerText.text = "e-mail: tanks@gmail.com";
        mail.border = null;
        mail.backgroundColor = null;
        mail.fillStyle = new Rgb(50, 50, 50);
        mail.parent = this.contactsInfo;
        this.registerControl(mail);

        instagram.x = 50;
        instagram.y = 1000;
        instagram.width = 400;
        instagram.name = "instagram";
        instagram.innerText.text = "instagram: instatanks";
        instagram.border = null;
        instagram.backgroundColor = null;
        instagram.fillStyle = new Rgb(50, 50, 50);
        instagram.parent = this.contactsInfo;
        this.registerControl(instagram);


        butt.x = 50;
        butt.y = 350;
        butt.name = "button";
        butt.parent = this.contactsInfo;
        this.registerControl(butt);
    }
}
