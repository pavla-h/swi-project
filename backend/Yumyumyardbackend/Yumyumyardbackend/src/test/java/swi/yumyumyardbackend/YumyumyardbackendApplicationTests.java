package swi.yumyumyardbackend;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import swi.yumyumyardbackend.model.Recipe;
import swi.yumyumyardbackend.repository.RecipeRepository;
import swi.yumyumyardbackend.service.RecipeServiceImpl;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class YumyumyardbackendApplicationTests {

    @Mock
    private RecipeRepository recipeRepository;

    @InjectMocks
    private RecipeServiceImpl recipeService;

    @Test
    void testReadRecipe() {
        Long recipeId = 1L;
        Recipe recipe = new Recipe();
        recipe.setId(recipeId);

        Mockito.when(recipeRepository.findById(recipeId)).thenReturn(Optional.of(recipe));

        Recipe fetchedRecipe = recipeService.read(recipeId);

        Assertions.assertNotNull(fetchedRecipe);
        Assertions.assertEquals(recipeId, fetchedRecipe.getId());
    }

    @Test
    void testDeleteRecipe() {
        Long recipeId = 1L;

        Recipe mockRecipe = new Recipe();
        mockRecipe.setId(recipeId);

        Mockito.when(recipeRepository.findById(recipeId)).thenReturn(Optional.of(mockRecipe));
        Mockito.doNothing().when(recipeRepository).deleteById(recipeId);

        Assertions.assertDoesNotThrow(() -> recipeService.delete(recipeId));
    }
}