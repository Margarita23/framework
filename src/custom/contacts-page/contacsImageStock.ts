export class ContactsImagesStock {
    public images: Map<string, HTMLImageElement> = new Map();

    constructor() {
        let panelImage = new Image();

        panelImage.src = require("../assets/panel.svg");

        this.images.set("contacts-panel", panelImage);
    }
}