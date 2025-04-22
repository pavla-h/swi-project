package swi.yumyumyardbackend.service;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import swi.yumyumyardbackend.contract.UserRequestContract;
import swi.yumyumyardbackend.exception.RecordNotFoundException;
import swi.yumyumyardbackend.model.User;
import swi.yumyumyardbackend.repository.RecipeRepository;
import swi.yumyumyardbackend.repository.UserRepository;

import java.util.HashSet;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;

    public UserServiceImpl(UserRepository userRepository, RecipeRepository recipeRepository) {
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
    }

    @Override
    public User create(UserRequestContract request) {
        var user = new User(request);
        manageRecipes(user, request);

        return userRepository.save(user);
    }

    @Override
    public User read(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id, "User"));
    }

    @Override
    public User update(UserRequestContract request) {
        var user = read(request.getId());

        user.setName(request.getName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        manageRecipes(user, request);

        return userRepository.save(user);
    }

    @Override
    public void delete(Long id) {
        var user = read(id);
        userRepository.delete(user);
    }

    @Override
    public List<User> list(String direction, String attribute) {
        List<User> ret;
        try{
            ret = userRepository.findAll(Sort.by(Sort.Direction.fromString(direction), attribute));
        } catch(PropertyReferenceException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        return ret;
    }

    @Override
    public List<User> listByRecipe(Long recipeId) {
        return userRepository.findAllByRecipesId(recipeId);
    }

    private void manageRecipes(User user, UserRequestContract request){
        if(request.getRecipeIds() != null && request.getRecipeIds().size() > 0){
            var recipes = recipeRepository.findAllById(request.getRecipeIds());
            user.setRecipes(new HashSet<>(recipes));
        } else {
            user.setRecipes(new HashSet<>());
        }
    }
}
