export interface RecipeRequest{
    id? : number;
    name : string;
    description : string| null;
    author : string | null ;
    authorId: number;
}