package swi.yumyumyardbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import swi.yumyumyardbackend.model.Recipe;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findAllByNameContainsIgnoreCase(String name);
    List<Recipe> findAllByOrderByNameAsc();
}
