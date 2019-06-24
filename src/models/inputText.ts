export class InputText {
    public width: string;
    public padding: string;
    public marging: string;
    public border: string;
    public borderRadius: string;
    public boxSizing: string;
    protected instance: InputText = new InputText(null, null, null, null, null, null);
    private constructor(width: string | null, padding: string | null, marging: string | null, border: string | null, borderRadius: string | null, boxSizing: string | null){
        this.width = width;
        this.padding = padding;
        this.marging = marging;
        this.border = border;
        this.borderRadius = borderRadius;
        this.boxSizing = boxSizing;
    };

    public getInstance(): InputText{
        return this.instance;
    }
}