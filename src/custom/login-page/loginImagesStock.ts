export class LoginImagesStock {
    public images: Map<string, HTMLImageElement> = new Map();

    constructor() {
        let submitImage = new Image();
        let submitHoverImage = new Image();
        let loginImage = new Image();
        let loginFocusImage = new Image();
        let passImage = new Image();
        let passFocusImage = new Image();

        submitImage.src = require("../../assets/button.svg");
        submitHoverImage.src = require("../../assets/button-hover.svg");
        loginImage.src = require("../../assets/input.svg");
        loginFocusImage.src = require("../../assets/input-hover.svg");
        passImage.src = require("../../assets/input.svg");
        passFocusImage.src = require("../../assets/input-hover.svg");

        this.images.set("submit", submitImage);
        this.images.set("submit-hover", submitHoverImage);
        this.images.set("login-input", loginImage);
        this.images.set("login-input-focus", loginFocusImage);
        this.images.set("pass-input", passImage);
        this.images.set("pass-input-focus", passFocusImage);
    }
}