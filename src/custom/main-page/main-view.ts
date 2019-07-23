import { View } from "../../models/view";
import { Panel } from "../../controls/panel";

export class MainView extends View {
    public helloPanel = new Panel;

    constructor(){
        super();
        this.setPropertiesHelloPanel();
    }

    public setPropertiesHelloPanel() {
        this.helloPanel.x = 400;
        this.helloPanel.y = 200;
        this.helloPanel.width = 600;
        this.helloPanel.height = 100;
        this.helloPanel.backgroundColor = null;
        this.helloPanel.border = null;
        this.registerControl(this.helloPanel);
    }
}