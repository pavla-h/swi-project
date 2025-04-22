package swi.yumyumyardbackend.service;
import org.springframework.stereotype.Service;
import swi.yumyumyardbackend.contract.RecipeRequestContract;
import swi.yumyumyardbackend.model.Recipe;

import java.util.List;
@Service
public interface RecipeService {
    Recipe create(RecipeRequestContract recipe);
    Recipe read(Long id);
    Recipe update(RecipeRequestContract recipe);
    void delete(Long id);
    List<Recipe> list();
    List<Recipe> search(String query);
}