import { View } from "./view";
import { Panel } from "../models/panel";
import { Button } from "../models/button";
import { Rgb } from "../models/rgb";

export class WrapperView extends View {
    public mainButtonPage = new Button();
    public contactsButtonPage = new Button();
    public playButtonPage = new Button();
    public footer = new Panel();
    public mainImage: HTMLImageElement = new Image();
    public contactImage: HTMLImageElement = new Image();
    public goToPlayImage: HTMLImageElement = new Image();

    constructor(){
        super();
        this.goToMainPage();
        this.goToContactPage();
        this.goPlay();
        this.showFooter();
    }

    public goToMainPage(){
        this.mainButtonPage.text = "Main page";
        this.mainImage.src = require('../assets/button.svg');
        this.mainButtonPage.backgroundImage = this.mainImage;
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
        this.contactImage.src = require('../assets/button.svg');
        this.contactsButtonPage.backgroundImage = this.contactImage;
        this.registerControl(this.contactsButtonPage);
    }

    public goPlay(){
        this.playButtonPage.text = "Go to play";
        this.playButtonPage.x = this.mainButtonPage.width*2;
        this.playButtonPage.y = 0;
        this.playButtonPage.fillStyle = new Rgb(140, 205, 166);
        this.playButtonPage.border = null;
        this.goToPlayImage.src = require('../assets/button.svg');
        this.playButtonPage.backgroundImage = this.goToPlayImage;
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

    /*
    public buttonHover(control: Button){
        //if(control.text=== "Main page"){
        //    this.mainImage.src = require('../assets/button-hover.svg');
         //   control.backgroundImage = this.mainImage;
        //} else {
            control.backgroundImage.src = require('../assets/button-hover.svg');
        //}
        control.draw(this.ctx);
    }

    public buttonNotHover(control: Button){
        this.ctx.clearRect(control.x + control.pX, control.y + control.pY, control.pW, control.pH);
        control.backgroundImage.src = require('../assets/button.svg');
        control.draw(this.ctx);
    }
*/
    public controlHover(control: Button){
        let req = require('../assets/'+ control.getControlType().toLowerCase() + '-hover.svg');
        if(control.text=== "Main page"){
            this.mainImage.src = req;
            control.backgroundImage = this.mainImage;
        } else if(control.text=== "Contacts"){
            this.contactImage.src = req;
            control.backgroundImage = this.contactImage;
        }
        else if(control.text=== "Go to play"){
            this.goToPlayImage.src = req;
            control.backgroundImage = this.goToPlayImage;
        }
        control.draw(this.ctx);
    }

    public controlNotHover(control: Button){
        this.ctx.clearRect(control.x + control.pX, control.y + control.pY, control.pW, control.pH);
        
        let req = require('../assets/'+ control.getControlType().toLowerCase() + '.svg');
        if(control.text=== "Main page"){
            this.mainImage.src = req;
            control.backgroundImage = this.mainImage;
        } else if(control.text=== "Contacts"){
            this.contactImage.src = req;
            control.backgroundImage = this.contactImage;
        }
        else if(control.text=== "Go to play"){
            this.goToPlayImage.src = req;
            control.backgroundImage = this.goToPlayImage;
        }
        control.draw(this.ctx);
    }
}