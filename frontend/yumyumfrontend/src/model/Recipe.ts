import { User } from "./User";

export interface Recipe {
    description: string;
    name : string;
    author : User[]  ;
    id : number;
}