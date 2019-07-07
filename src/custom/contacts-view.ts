import { View } from "../models/view";
import { ContactsController } from "./contacts-controller";
import { Panel } from "../models/panel";
import { Button } from "../models/button";

export class ContactsView extends View {
    protected static instance = new ContactsView;
    private controller: ContactsController = new ContactsController();
    private constructor(){super();}

    public static getInstance(): ContactsView {
        return ContactsView.instance;
    }

    private contactsInfo(){
        let panel = new Panel(1);
        panel.width = 400;
        panel.height = 400;
        panel.ctx.fillText("tel: 000-000-000", panel.x, panel.height);
        this.registerControl(panel);
    }

    private menuGoToLogin(){
        let button = new Button(1);
        button.text = "Main page";
        this.registerControl(button);
    }

    public run(){
        this.contactsInfo();
        this.menuGoToLogin();
    }
}
