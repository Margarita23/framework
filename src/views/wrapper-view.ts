import { View } from "./view";
import { Panel } from "../models/panel";
import { Button } from "../models/button";

export class WrapperView extends View {
    public mainButtonPage = new Button();
    public contactsButtonPage = new Button();
    public playButtonPage = new Button();
    public footer = new Panel();

    constructor(){
        super();
        this.goToMainPage();
        this.goToContactPage();
        this.goPlay();
        this.showFooter();

        //this.ctx.strokeStyle = new Rgb(0, 0, 0).getColor();
        //this.ctx.strokeRect(0, 0, 1000, 1000);
    }

    public goToMainPage(){
        this.mainButtonPage.text = "Main page";
        this.registerControl(this.mainButtonPage);
    }

    public goToContactPage(){
        this.contactsButtonPage.text = "Contacts";
        this.contactsButtonPage.x = this.mainButtonPage.width;
        this.contactsButtonPage.y = 0;
        this.registerControl(this.contactsButtonPage);
    }

    public goPlay(){
        this.playButtonPage.text = "Go to play";
        this.playButtonPage.x = this.mainButtonPage.width*2;
        this.playButtonPage.y = 0;
        this.registerControl(this.playButtonPage);
    }

    public showFooter(){
        this.footer.x = 0;
        this.footer.y = 950;
        this.footer.width = 1000;
        this.footer.height = 50;
        this.footer.innerText.text = "@WebTanks";
        this.footer.innerText.startX = 500;
        this.footer.innerText.align = "center";
        this.registerControl(this.footer);
    }
}