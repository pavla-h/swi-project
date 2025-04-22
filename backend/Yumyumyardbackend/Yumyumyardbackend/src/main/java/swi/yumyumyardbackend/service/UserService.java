package swi.yumyumyardbackend.service;
import org.springframework.stereotype.Service;
import swi.yumyumyardbackend.contract.UserRequestContract;
import swi.yumyumyardbackend.model.User;

import java.util.List;

@Service
public interface UserService {
    User create(UserRequestContract request);
    User read(Long id);
    User update(UserRequestContract request);
    void delete(Long id);
    List<User> list(String direction, String attribute);
    List<User> listByRecipe(Long recipeId);
}
