import { ContactsView } from "../views/contacts-view";
import { Application } from "../models/application";
import { MainView } from "../views/main-view";
import { MainController } from "./main-controller";
import { MapsView } from "../views/maps-view";
import { MapsController } from "./maps-controller";
import { Control } from "../models/control";
import { Rgb } from "../models/rgb";
import { Panel } from "../models/panel";

export class ContactsController{
    public view: ContactsView;
    public gamer: GamerProfile;

    constructor(view: ContactsView, gamer?: GamerProfile){
        this.view = view;
        const mainView = new MainView();
        let mainContr: MainController = null;
        if(gamer){
            this.gamer = gamer;
            mainContr = new MainController(mainView, this.gamer);
        } else {
            mainContr = new MainController(mainView);
        }
        this.view.mainButtonPage.click = this.goToMainPage.bind((<ContactsView>this.view).mainButtonPage, this.view, gamer);
        this.view.playButtonPage.click = this.goToMapsPage.bind((<ContactsView>this.view).mainButtonPage, this.view, gamer);

        this.clickEffectsForButtons(this.view.mainButtonPage);
        this.clickEffectsForButtons(this.view.playButtonPage);
        this.view.footer.mousemove = this.changeSizeOrPosition.bind(this.view.footer, 0, 850, this.view.footer.width, 150, this);
        this.view.footer.mouseleave = this.changeSizeOrPosition.bind(this.view.footer, 0, 950, this.view.footer.width, 50, this);
    }

    private changeSizeOrPosition(x: number, y: number, width?: number, height?: number, controller?: ContactsController){
        if(this instanceof Panel){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.draw(controller.view.ctx);
        }
    }

    private clickEffectsForButtons(button: Control){
        let lastColor = button.backgroundColor;
        button.mousedown = () => { button.backgroundColor = new Rgb(240,240,240); button.draw(this.view.ctx); };
        button.mouseup = () => { button.backgroundColor = lastColor; button.draw(this.view.ctx); };
    }

    private goToMainPage(old: MapsView, gamer: GamerProfile): void{
        const mainView = new MainView();
        const mainContr = new MainController(mainView, gamer);
        (Application.getInstance()).unsubsrc(old);
        (Application.getInstance()).run(mainView);
    }

    private goToMapsPage(oldView: MainView, gamer?: GamerProfile): void{
        const mapsView = new MapsView();
        const mapsContr = new MapsController(mapsView, gamer);
        (Application.getInstance()).unsubsrc(oldView);
        (Application.getInstance()).run(mapsView);
    }
}