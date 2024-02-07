import { Ingredients } from "../Shared/Ingredients.model";

export class Recipe{
    public name: string;
    public description: string;
    public image: string;
    public Ingredients: Ingredients[];

    constructor(name: string, desc: string, image: string, ingredients: Ingredients[]){
        this.name = name;
        this.description = desc;
        this.image = image;
        this.Ingredients = ingredients
    }
}