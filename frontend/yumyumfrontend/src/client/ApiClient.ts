import { User } from "../model/User";
import { UserRequest } from "../model/UserRequest";
import { Recipe } from "../model/Recipe";
import { RecipeRequest } from "../model/RecipeRequest";

export class ApiClient {
    public static async getAllUsers(): Promise<User[]> {
        const response = await fetch("http://localhost:8080/users");
        return await response.json();
    }

    public static async deleteUser(id: number): Promise<Response> {
        return await fetch("http://localhost:8080/users/" + id, {
            method: "DELETE"
        });
    }

    public static async getUser(id: number): Promise<User> {
        const response = await fetch("http://localhost:8080/users/" + id);
        if (response.ok) {
            return await response.json();
        }
        throw Error(response.statusText);
    }

    public static async getRecipesForUser(userId: number): Promise<Recipe[]> {
        const response = await fetch("http://localhost:8080/recipes/forUser?userId=" + userId);
        if (response.ok) {
            return await response.json();
        }
        throw Error(response.statusText);
    }

    public static async updateUser(user: User): Promise<User> {
        const requestBody: UserRequest = { id: user.id, username: user.username, name: user.name };
        const response = await fetch("http://localhost:8080/users", {
            method : 'PUT',
            body: JSON.stringify(requestBody),
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return await response.json();
        }
        throw Error(response.statusText);
    }

    public static async createUser(user: UserRequest): Promise<User> {
        const response = await fetch("http://localhost:8080/users", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(`Failed to create user: ${data.message}`);
        }
    }

    public static async getAllRecipes(attribute?: string, direction?: string): Promise<Recipe[]> {
        let url = "http://localhost:8080/recipes";
        if(attribute || direction){
            url = `${url}?`;
        }
        if(attribute){
            url = `${url}attribute=${attribute}`;
        }
        if(direction){
            if(attribute){
                url = `${url}&`;
            }
            url = `${url}direction=${direction}`;
        }
        const response = await fetch(url);
        return await response.json();
    }

    public static async deleteRecipe(id: number): Promise<Response> {
        return await fetch("http://localhost:8080/recipes/" + id, {
            method: "DELETE"
        });
    }

    public static async updateRecipe(recipe: Recipe): Promise<Recipe> {
        const requestBody: RecipeRequest = {
            id: recipe.id, name: recipe.name, description: recipe.description,
            author: recipe.name,
            authorId: 0
        };
        //authorId  idk uvidíme
        const response = await fetch("http://localhost:8080/recipes", {
            method : 'PUT',
            body: JSON.stringify(requestBody),
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return await response.json();
        }
        throw Error(response.statusText);
    }

    public static async getRecipe(id: number): Promise<Recipe> {
        const response = await fetch("http://localhost:8080/recipes/" + id);
        if (response.ok) {
            return await response.json();
        }
        throw Error(response.statusText);
    }

    public static async createRecipe(recipe: RecipeRequest): Promise<Recipe> {
        const response = await fetch("http://localhost:8080/recipes", {
            method : 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return await response.json();
        }
        throw new Error(`Request failed with status ${response.status}`);

    }

    public static async searchUsers(searchQuery: string): Promise<User[]> {
        const response = await fetch("http://localhost:8080/users/search", {
            method : 'POST',
            body: searchQuery,
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return await response.json();
        }
        throw Error(response.statusText);
    }
}