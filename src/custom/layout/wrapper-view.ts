import { View } from "../../models/view";
import { Panel } from "../../controls/panel";
import { Button } from "../../controls/button";
import { Rgb } from "../../models/rgb";
import { WrapperImagesStock } from "./wrapperImagesStock";

export class WrapperView extends View {
    public mainButtonPage: Button = new Button();
    public contactsButtonPage: Button = new Button();
    public photoButtonPage: Button = new Button();
    public playButtonPage: Button = new Button();
    public footer: Panel = new Panel();
    public loginViewPanel: Panel = new Panel();
    public images: Map<string, HTMLImageElement> = (new WrapperImagesStock).images;

    constructor(){
        super();
        this.showBorder();
        this.goToMainPage();
        this.goToContactPage();
        this.goSettingsPhoto();
        this.goToPlay();

        this.showFooter();
    }

    public goToMainPage(){
        this.mainButtonPage.width = 250;
        this.mainButtonPage.text = "Main page";
        this.mainButtonPage.backgroundImage = null;
        this.mainButtonPage.border = null;
        this.mainButtonPage.backgroundColor = new Rgb(50, 50, 50);
        this.mainButtonPage.fillStyle = new Rgb(200, 200, 200);
        this.registerControl(this.mainButtonPage);
    }

    public goToContactPage(){
        this.contactsButtonPage.text = "Contacts";
        this.contactsButtonPage.x = 250;
        this.contactsButtonPage.y = 0;
        this.contactsButtonPage.width = 250;
        this.contactsButtonPage.fillStyle = new Rgb(200, 200, 200);
        this.contactsButtonPage.border = null;
        this.contactsButtonPage.backgroundColor = new Rgb(50, 50, 50);
        this.contactsButtonPage.backgroundImage = null;
        this.registerControl(this.contactsButtonPage);
    }

    public goSettingsPhoto(){
        this.photoButtonPage.text = "Setting Photo";
        this.photoButtonPage.x = 500;
        this.photoButtonPage.width = 250;
        this.photoButtonPage.y = 0;
        this.photoButtonPage.fillStyle = new Rgb(200, 200, 200);
        this.photoButtonPage.border = null;
        this.photoButtonPage.backgroundColor = new Rgb(50, 50, 50);
        this.photoButtonPage.backgroundImage = null;
        this.registerControl(this.photoButtonPage);
    }

    public goToPlay(){
        this.playButtonPage.text = "Go To Play";
        this.playButtonPage.x = 750;
        this.playButtonPage.width = 250;
        this.playButtonPage.y = 0;
        this.playButtonPage.fillStyle = new Rgb(200, 200, 200);
        this.playButtonPage.border = null;
        this.playButtonPage.backgroundColor = new Rgb(50, 50, 50);
        this.playButtonPage.backgroundImage = null;
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
        this.footer.backgroundColor = new Rgb(50, 50, 50);
        this.footer.fillStyle = new Rgb(200, 200, 200);
        this.footer.border = null;
        this.registerControl(this.footer);
    }

    public controlHover(control: Button){
        control.backgroundColor = new Rgb(200, 200, 200);
        control.fillStyle = new Rgb(50, 50, 50);
        control.draw(this.ctx);
    }

    public controlNotHover(control: Button){
        control.fillStyle = new Rgb(200, 200, 200);
        control.backgroundColor = new Rgb(50, 50, 50);
        control.draw(this.ctx);
    }

    public showBorder() {
        this.loginViewPanel.name = "loginViewPanel";
        this.loginViewPanel.x = 0;
        this.loginViewPanel.y = 0;
        this.loginViewPanel.width = 1000;
        this.loginViewPanel.height = 1000;
        this.loginViewPanel.backgroundColor = null;
        this.loginViewPanel.border = new Rgb(50, 50, 50);
        this.registerControl(this.loginViewPanel);
    }
}