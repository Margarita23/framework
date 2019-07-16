import { View } from "./view";
import { Input } from "../models/input";
import { Button } from "../models/button";
import { Checkbox } from "../models/checkbox";
import { RadioButton } from "../models/radioButton";
import { Panel } from "../models/panel";
import { Rgb } from "../models/rgb";

export class LoginView extends View {
    public pass: Input = new Input();
    public submitButton: Button = new Button();
    public checkboxShowPass: Checkbox = new Checkbox();
    public genderRadios: RadioButton[] = [new RadioButton(), new RadioButton(), new RadioButton()];

    constructor(){
        super();
        this.loginForm();
    }

    private loginForm(){
        let login = new Input();
        login.x = 500;
        login.y = 300;
        login.inputText.maxLength = 50;
        login.inputText.setText("Print login...");
        this.registerControl(login);

        this.pass.x = 500;
        this.pass.y = 400;
        this.pass.inputText.secret = true;
        this.pass.inputText.setText("Print password...");
        this.registerControl(this.pass);

        this.checkboxShowPass.x = this.pass.x + this.pass.width + 50;
        this.checkboxShowPass.y = this.pass.y;
        this.checkboxShowPass.name = "Show password";
        this.registerControl(this.checkboxShowPass);

        this.radiosGender();

        this.submitButton.x = 500;
        this.submitButton.y = 600;
        this.submitButton.text = "Submit";
        this.registerControl(this.submitButton);
    }

    private radiosGender(){
        let genderPanel = new Panel();
        genderPanel.border = new Rgb(255,0,0);
        genderPanel.backgroundColor = null;
        genderPanel.x = 375;
        genderPanel.y = 500;
        genderPanel.width = 400;

        this.genderRadios[0].x = 0;
        this.genderRadios[0].y = 37.5 - this.genderRadios[0].radius;
        this.genderRadios[0].name = "Male";
        this.genderRadios[0].disabled = false;
        this.genderRadios[0].parent = genderPanel;
        this.registerControl(this.genderRadios[0]);

        this.genderRadios[1].x = 130;
        this.genderRadios[1].y = 37.5 - this.genderRadios[0].radius;
        this.genderRadios[1].name = "Female";
        this.genderRadios[1].disabled = false;
        this.genderRadios[1].parent = genderPanel;
        this.registerControl(this.genderRadios[1]);

        this.genderRadios[2].x = 290;
        this.genderRadios[2].y = 37.5 - this.genderRadios[0].radius;
        this.genderRadios[2].name = "Dog";
        this.genderRadios[2].disabled = true;
        this.genderRadios[2].parent = genderPanel;
        this.registerControl(this.genderRadios[2]);

        this.registerControl(genderPanel);
    }
}