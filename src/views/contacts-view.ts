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
        this.contactsInfo.innerText = "tel: 000-000-000";
        this.registerControl(this.contactsInfo);

        let but = new Button();
        but.y = 375;
        but.backgroundColor = new Rgb(200,0,200);
        but.parent = this.contactsInfo;
        this.registerControl(but);
        console.log(but);
    }
}
