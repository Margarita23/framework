import { View } from "../../models/view";
import { Panel } from "../../controls/panel";
import { Button } from "../../controls/button";
import { Rgb } from "../../models/rgb";
import { WrapperImagesStock } from "./wrapperImagesStock";

export class WrapperView extends View {
    public mainButtonPage: Button = new Button();
    public contactsButtonPage: Button = new Button();
    public playButtonPage: Button = new Button();
    public footer: Panel = new Panel();
    public images: Map<string, HTMLImageElement> = (new WrapperImagesStock).images;

    constructor(){
        super();
        this.goToMainPage();
        this.goToContactPage();
        this.goPlay();
        this.showFooter();
    }

    public goToMainPage(){
        this.mainButtonPage.text = "Main page";
        this.mainButtonPage.backgroundImage = this.images.get("main");
        this.mainButtonPage.backgroundColor = null;
        this.mainButtonPage.border = null;
        this.mainButtonPage.fillStyle = new Rgb(140, 205, 166);
        this.registerControl(this.mainButtonPage);
    }

    public goToContactPage(){
        this.contactsButtonPage.text = "Contacts";
        this.contactsButtonPage.x = this.mainButtonPage.width;
        this.contactsButtonPage.y = 0;
        this.contactsButtonPage.fillStyle = new Rgb(140, 205, 166);
        this.contactsButtonPage.border = null;
        this.contactsButtonPage.backgroundColor = null;
        this.contactsButtonPage.backgroundImage = this.images.get("contact");
        this.registerControl(this.contactsButtonPage);
    }

    public goPlay(){
        this.playButtonPage.text = "Photo";
        this.playButtonPage.x = this.mainButtonPage.width*2;
        this.playButtonPage.y = 0;
        this.playButtonPage.fillStyle = new Rgb(140, 205, 166);
        this.playButtonPage.border = null;
        this.playButtonPage.backgroundColor = null;
        this.playButtonPage.backgroundImage = this.images.get("photo");
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

    public controlHover(control: Button){
        control.fillStyle = new Rgb(0, 55, 26);
        if(control.text=== "Main page"){
            control.backgroundImage = this.images.get("main-hover");
        } else if(control.text=== "Contacts"){
            control.backgroundImage = this.images.get("contact-hover");
        }
        else if(control.text=== "Photo"){
            control.backgroundImage = this.images.get("photo-hover");
        }
        control.draw(this.ctx);
    }

    public controlNotHover(control: Button){
        this.playButtonPage.fillStyle = new Rgb(140, 205, 166);
        if(control.text === "Main page"){
            control.backgroundImage = this.images.get("main");
        } else if(control.text === "Contacts"){
            control.backgroundImage = this.images.get("contact");
        }
        else if(control.text === "Photo"){
            control.backgroundImage = this.images.get("photo");
        }
        control.draw(this.ctx);
    }
}