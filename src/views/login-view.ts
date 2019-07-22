import { View } from "./view";
import { Input } from "../models/input";
import { Button } from "../models/button";
import { Checkbox } from "../models/checkbox";
import { Panel } from "../models/panel";
import { RadioButton } from "../models/radioButton";
import { Rgb } from "../models/rgb";

export class LoginView extends View {
    public loginForm: Panel = new Panel();
    public submitImage: HTMLImageElement = new Image();
    public loginImage: HTMLImageElement = new Image();
    public passImage: HTMLImageElement = new Image();

    constructor(){
        super();
        this.createLoginForm();
    }

    private createLoginForm(){
        this.loginForm.name = "loginForm";
        this.loginForm.x = 200;
        this.loginForm.y = 200;
        this.loginForm.width = 600;
        this.loginForm.height = 600;
        this.loginForm.border = null;
        this.loginForm.backgroundColor = null;
        this.registerControl(this.loginForm);

        let login = new Input();
        let pass = new Input();
        let checkBoxShowPassword = new Checkbox();

        login.x = 0; login.y = 0;
        pass.x = 0; pass.y = 150;
        login.width = this.loginForm.width - 200;
        login.height = 100;
        pass.width = this.loginForm.width - 200;
        pass.height = 100;

        login.border = null;
        login.backgroundColor = null;
        this.loginImage.src = require("../assets/input.svg");
        login.backgroundImage = this.loginImage;

        login.border = null;
        login.fillStyle = new Rgb(96,160,122);

        login.parent = this.loginForm;
        login.inputText.maxLength = 50;
        login.name = "login";
        login.inputText.setText("Print login...");
        this.registerControl(login);

        pass.border = null;
        pass.backgroundColor = null;
        this.passImage.src = require("../assets/input.svg")
        pass.backgroundImage = this.passImage;
        pass.parent = this.loginForm;
        pass.inputText.secret = true;
        pass.name = "password";
        pass.inputText.setText("Print password...");
        this.registerControl(pass);

        checkBoxShowPassword.parent = this.loginForm;
        checkBoxShowPassword.x = this.loginForm.width - 190;
        checkBoxShowPassword.y = pass.y;
        checkBoxShowPassword.name = "show";

        this.registerControl(checkBoxShowPassword);

        let submit = new Button();
        submit.name = "submit";
        submit.x = 50; submit.y = 450;
        submit.height = 100;
        submit.width = this.loginForm.width - 300;
        submit.parent = this.loginForm;
        submit.backgroundColor = null;
        submit.border = null;
        submit.fillStyle = new Rgb(96,160,122);
        submit.text = "Submit";
        this.registerControl(submit);
        this.submitImage.src = require('../assets/button.svg');
        submit.backgroundImage = this.submitImage;
        this.radiosGender();
    }

    private radiosGender(){
        let genderPanel = new Panel();
        genderPanel.backgroundColor = null;
        genderPanel.x = 0;
        genderPanel.y = 300;
        genderPanel.width = this.loginForm.width;
        genderPanel.parent = this.loginForm;
        genderPanel.border = null;
        genderPanel.name = "genderPanel";
        this.registerControl(genderPanel);

        let radioMale = new RadioButton();
        let radioFemale = new RadioButton();
        let radioDog = new RadioButton();

        radioMale.x = 0;
        radioMale.y = 37.5 - radioMale.radius;
        radioMale.name = "male";
        radioMale.disabled = false;
        radioMale.parent = genderPanel;
        this.registerControl(radioMale);

        radioFemale.x = 130;
        radioFemale.y = 37.5 - radioFemale.radius;
        radioFemale.name = "female";
        radioFemale.disabled = false;
        radioFemale.parent = genderPanel;
        this.registerControl(radioFemale);

        radioDog.x = 290;
        radioDog.y = 37.5 - radioDog.radius;
        radioDog.name = "dog";
        radioDog.disabled = true;
        radioDog.parent = genderPanel;
        this.registerControl(radioDog);
    }

    public whenSubmitHover(control: Button){
        this.submitImage.src = require('../assets/button-hover.svg');
        control.backgroundImage = this.submitImage;
        control.draw(this.ctx);
    }

    public whenSubmitNotHover(control: Button){
        this.ctx.clearRect(control.x + control.pX, control.y + control.pY, control.pW, control.pH);
        this.submitImage.src = require('../assets/button.svg');
        control.backgroundImage = this.submitImage;
        control.draw(this.ctx);
    }
}