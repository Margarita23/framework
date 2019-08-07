import { View } from "../../models/view";
import { Input } from "../../controls/input";
import { Button } from "../../controls/button";
import { Checkbox } from "../../controls/checkbox";
import { Panel } from "../../controls/panel";
import { RadioButton } from "../../controls/radioButton";
import { Rgb } from "../../models/rgb";
import { LoginImagesStock } from "./loginImagesStock";

export class LoginView extends View {
    public loginForm: Panel = new Panel();
    public login: Input = new Input();
    public pass: Input = new Input();
    public genderPanel: Panel = new Panel();
    public loginViewPanel: Panel = new Panel();
    public images: Map<string, HTMLImageElement> = (new LoginImagesStock()).images;

    constructor(){
        super();
        this.showBorder();
        this.createLoginForm();
    }

    private createLoginForm(){
        this.loginForm.name = "loginForm";
        this.loginForm.x = 200;
        this.loginForm.y = 200;
        this.loginForm.width = 600;
        this.loginForm.height = 600;
        this.loginForm.backgroundColor = null;
        this.loginForm.border = null;
        this.registerControl(this.loginForm);

        let checkBoxShowPassword = new Checkbox();

        this.login.x = 0; this.login.y = 0;
        this.pass.x = 0; this.pass.y = 150;
        this.login.width = this.loginForm.width - 200;
        this.login.height = 100;
        this.login.backgroundColor = new Rgb(200, 200, 200);
        this.login.backgroundColorFocus = new Rgb(50, 50, 50);
        this.login.borderFocus = null;

        this.pass.width = this.loginForm.width - 200;
        this.pass.height = 100;
        this.pass.backgroundColor = new Rgb(200, 200, 200);
        this.pass.backgroundColorFocus = new Rgb(50, 50, 50);
        this.pass.borderFocus = null;

        this.login.border = null;
        this.login.backgroundColor = new Rgb(200, 200, 200);
        this.login.backgroundColorFocus = new Rgb(50, 50, 50);
        this.login.fillStyle = new Rgb(50, 50, 50);
        this.login.fillStyleFocus =new Rgb(200, 200, 200);
        this.login.parent = this.loginForm;
        this.login.inputText.maxLength = 50;
        this.login.name = "login";
        this.login.inputText.setText("Print login...");
        this.registerControl(this.login);

        this.pass.border = null;
        this.pass.backgroundColor = new Rgb(200, 200, 200);
        this.pass.backgroundColorFocus = new Rgb(50, 50, 50);
        this.pass.fillStyle = new Rgb(50, 50, 50);
        this.pass.fillStyleFocus =new Rgb(200, 200, 200);
        this.pass.inputText.secret = true;
        this.pass.parent = this.loginForm;
        this.pass.name = "password";
        this.pass.inputText.setText("Print password...");
        this.registerControl(this.pass);

        checkBoxShowPassword.parent = this.loginForm;
        checkBoxShowPassword.x = this.loginForm.width - 190;
        checkBoxShowPassword.y = this.pass.y;
        checkBoxShowPassword.fillStyle = new Rgb(0, 0, 0);
        checkBoxShowPassword.name = "show";

        this.registerControl(checkBoxShowPassword);

        let submit = new Button();
        submit.name = "submit";
        submit.x = 50; submit.y = 450;
        submit.height = 100;
        submit.width = this.loginForm.width - 300;
        submit.parent = this.loginForm;
        submit.backgroundColor = new Rgb(50, 50, 50);
        submit.border = null;
        submit.fillStyle = new Rgb(200, 200, 200);
        submit.text = "Submit";
        this.registerControl(submit);
        this.radiosGender();
    }

    private radiosGender(){
        this.genderPanel.backgroundColor = null;
        this.genderPanel.x = 0;
        this.genderPanel.y = 300;
        this.genderPanel.width = this.loginForm.width;
        this.genderPanel.parent = this.loginForm;
        this.genderPanel.border = null;
        this.genderPanel.name = "genderPanel";
        this.registerControl(this.genderPanel);

        let radioMale = new RadioButton();
        let radioFemale = new RadioButton();
        let radioDog = new RadioButton();

        radioMale.x = 0;
        radioMale.y = 37.5 - radioMale.radius;
        radioMale.name = "male";
        radioMale.disabled = false;
        radioMale.parent = this.genderPanel;
        this.registerControl(radioMale);

        radioFemale.x = 130;
        radioFemale.y = 37.5 - radioFemale.radius;
        radioFemale.name = "female";
        radioFemale.disabled = false;
        radioFemale.parent = this.genderPanel;
        this.registerControl(radioFemale);

        radioDog.x = 290;
        radioDog.y = 37.5 - radioDog.radius;
        radioDog.name = "dog";
        radioDog.disabled = true;
        radioDog.parent = this.genderPanel;
        this.registerControl(radioDog);
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