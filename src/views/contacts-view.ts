import { View } from "../models/view";
import { ContactsController } from "../controllers/contacts-controller";
import { Panel } from "../models/panel";
import { Button } from "../models/button";

export class ContactsView extends View {
    //public controller: ContactsController = new ContactsController();
    constructor(){super();}

    private contactsInfo(){
        let panel = new Panel();
        panel.width = 400;
        panel.height = 400;
        panel.ctx.fillText("tel: 000-000-000", panel.x, panel.height);
        this.registerControl(panel);
    }

    private menuGoToLogin(){
        let button = new Button();
        button.text = "Main page";
        this.registerControl(button);
    }

    public run(){
        this.contactsInfo();
        this.menuGoToLogin();
    }
}
