export class InputText {

    public text: string = null;
    public maxLength: number = 50;
    public secret: boolean = false;
    private secretText: string = "";
    public align: string = "left";
    public startX: number = 0;

    constructor() {}

    private checkTextLength(text: string):string {
        let resText = "";
        if(text.length > this.maxLength) {
            resText = text.substring(0, this.maxLength);
        }else {
            resText = text;
        }
        return resText;
    }

    public addText(text: string): void{
        if(text == "Backspace" && text.length != 0) {
            this.text = this.text.slice(0,-1);
            this.secretText = this.secretText.slice(0,-1);
        }
        else if(this.text.length <= this.maxLength) {
            this.text += text;
            this.secretText +="*";
        }
    }

    public setText(text: string): void{
        this.text = this.checkTextLength(text);
        if(this.secret){
            for(let i=0; i < this.text.length; i++){
                this.secretText += "*";
            }
        }
    }

    public getText(): string{
        return this.secret ? this.secretText : this.text;
    }
}