export class Recipe{
    public name: string;
    public description: string;
    public image: string;

    constructor(name: string, desc: string, image: string){
        this.name = name;
        this.description = desc;
        this.image = image;
    }
}