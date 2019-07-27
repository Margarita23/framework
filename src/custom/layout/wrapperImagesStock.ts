export class WrapperImagesStock {
    public images: Map<string, HTMLImageElement> = new Map();

    constructor() {
        let mainImage = new Image();
        let mainHoverImage = new Image();
        let containImage = new Image();
        let containHoverImage = new Image();
        let photoImage = new Image();
        let photoHoverImage = new Image();

        mainImage.src = require("../../assets/button.svg");
        mainHoverImage.src = require("../../assets/button-hover.svg");
        containImage.src = require("../../assets/button.svg");
        containHoverImage.src = require("../../assets/button-hover.svg");
        photoImage.src = require("../../assets/button.svg");
        photoHoverImage.src = require("../../assets/button-hover.svg");

        this.images.set("main", mainImage);
        this.images.set("main-hover", mainHoverImage);
        this.images.set("contact", containImage);
        this.images.set("contact-hover", containHoverImage);
        this.images.set("photo", photoImage);
        this.images.set("photo-hover", photoHoverImage);
    }
}