import { View } from "../models/view";
import { LoginController } from "./login-controller";
import { Input } from "../models/input";
import { Button } from "../models/button";
import { Checkbox } from "../models/checkbox";
import { RadioButton } from "../models/radioButton";
import { Rgb } from "../models/rgb";

export class LoginView extends View {
    protected static instance = new LoginView;
    private controller: LoginController = new LoginController();
    private constructor() { super(); }

    public static getInstance(): LoginView {
        return LoginView.instance;
    }

    private loginForm(){
        let login = new Input();
        login.x = 500;
        login.y = 300;
        login.inputText.maxLength = 50;
        login.inputText.setText("Print login...");
        this.registerControl(login);

        let pass = new Input();
        pass.x = 500;
        pass.y = 400;
        pass.inputText.secret = true;
        pass.inputText.setText("Print password...");
        this.registerControl(pass);

        let checkbox = new Checkbox();
        checkbox.x = pass.x + pass.width + 50;
        checkbox.y = pass.y;
        checkbox.name = "Show password";
        checkbox.click = this.controller.checkedToShowPassword.bind(checkbox, pass);
        this.registerControl(checkbox);

        let radioButtMale = new RadioButton();
        let radioButtFemale = new RadioButton();
        let radioButtDog = new RadioButton();

        radioButtMale.x = 450;
        radioButtMale.y = 500;
        radioButtMale.name = "Male";
        radioButtMale.click = this.controller.checkedMaleOrFemale.bind(null, radioButtMale, radioButtFemale, radioButtDog);
        this.registerControl(radioButtMale);

        radioButtFemale.x = 600;
        radioButtFemale.y = 500;
        radioButtFemale.name = "Female";
        radioButtFemale.click = this.controller.checkedMaleOrFemale.bind(null, radioButtFemale, radioButtMale, radioButtDog);
        this.registerControl(radioButtFemale);

        radioButtDog.x = 750;
        radioButtDog.y = 500;
        radioButtDog.name = "Dog";
        radioButtDog.setDisabled(true);
        radioButtDog.click = this.controller.checkedMaleOrFemale.bind(null, radioButtDog, radioButtMale, radioButtFemale);
        this.registerControl(radioButtDog);

        let submit = new Button();
        submit.x = 500;
        submit.y = 600;
        submit.text = "Submit";
        submit.click = this.controller.submitLoginAndPassword.bind(this);
        this.registerControl(submit);
    }

    private menuGoToLogin(){
        let button = new Button();
        button.text = "Main page";
        this.registerControl(button);
    }

    public run(): void{
        this.menuGoToLogin();
        this.loginForm();
    }
}