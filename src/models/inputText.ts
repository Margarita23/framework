export class InputText {

    private text: string;
    maxLength: number;

    constructor(text: string, maxLength: number) {
        if(text.length > maxLength) {
            this.text = text.substring(0, maxLength);
        }else {
            this.text = text;
        }
        this.maxLength = maxLength;
    }

    public setText(text: string){
        if(text == "Backspace" && text.length != 0) {
            this.text = this.text.slice(0,-1);
        }
        else if(this.text.length <= this.maxLength) {
            this.text += text;
        }
    }

    public getText(): string{
        return this.text;
    }

}