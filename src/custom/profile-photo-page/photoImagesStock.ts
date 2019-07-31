export class PhotoImagesStock {
    public images: Map<string, HTMLImageElement> = new Map();

    constructor(){
        for(let i=0; i<5; i++){
            for(let j=0; j<5; j++){
                let im = new Image();
                try{
                    im.src = require("../../assets/photo" + i + j + ".svg");
                } catch(error){
                    im.src = require("../../assets/no-photo.svg");
                }
                this.images.set("photo" + i + j, im);
            }
        }
    }
}