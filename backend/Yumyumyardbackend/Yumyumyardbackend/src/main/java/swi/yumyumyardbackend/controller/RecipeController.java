package swi.yumyumyardbackend.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import swi.yumyumyardbackend.contract.RecipeRequestContract;
import swi.yumyumyardbackend.model.Recipe;
import swi.yumyumyardbackend.service.RecipeService;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping("/recipes")
    public Recipe postRecipe(@RequestBody @Validated RecipeRequestContract recipe){ return recipeService.create(recipe); }

    @GetMapping("/recipes")
    public List<Recipe> getRecipes(){ return recipeService.list(); }

    @GetMapping("/recipes/{id}")
    public Recipe getRecipe(@PathVariable("id") Long id){ return recipeService.read(id); }

    @DeleteMapping("/recipes/{id}")
    public void deleteRecipe(@PathVariable("id") Long id) { recipeService.delete(id); }

    @PutMapping("/recipes")
    public Recipe putRecipe(@RequestBody @Validated RecipeRequestContract recipe) { return recipeService.update(recipe); }

    @PostMapping("/recipes/search")
    public List<Recipe> searchRecipes(@RequestBody String query) { return recipeService.search(query); }
}
