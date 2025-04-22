package swi.yumyumyardbackend.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import swi.yumyumyardbackend.contract.RecipeRequestContract;
import swi.yumyumyardbackend.exception.RecordNotFoundException;
import swi.yumyumyardbackend.model.Recipe;
import swi.yumyumyardbackend.repository.RecipeRepository;

import java.util.List;

@Service
public class RecipeServiceImpl implements RecipeService{
    private final RecipeRepository recipeRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @Override
    public Recipe create(RecipeRequestContract recipe) {
        var toDb = new Recipe(recipe);
        var ret = recipeRepository.save(toDb);
        return null;
    }

    @Override
    public Recipe read(Long id) {
        return recipeRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id, "Recipe"));
    }

    @Override
    public Recipe update(RecipeRequestContract recipe) {
        if(recipe.getId() == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        var fromDb = read(recipe.getId());

        fromDb.setName(recipe.getName());
        fromDb.setDescription(recipe.getDescription());
        fromDb.setAuthor(recipe.getAuthor());
        var ret = recipeRepository.save(fromDb);

        return ret;
    }

    @Override
    public void delete(Long id) {
        var fromDb = read(id);
        if(fromDb == null){
            throw new RecordNotFoundException(id, "Recipe");
        }
        recipeRepository.deleteById(fromDb.getId());
    }

    @Override
    public List<Recipe> list() {
        return recipeRepository.findAllByOrderByNameAsc();
    }

    @Override
    public List<Recipe> search(String query) {
        return recipeRepository.findAllByNameContainsIgnoreCase(query);
    }
}
