package swi.yumyumyardbackend.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swi.yumyumyardbackend.contract.UserRequestContract;
import swi.yumyumyardbackend.model.User;
import swi.yumyumyardbackend.service.UserService;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class UserController {
    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/users")
    public User postUser(@RequestBody @Valid UserRequestContract request) {return userService.create(request); }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable("id") Long id) { return userService.read(id); }

    @PutMapping("/users")
    public User putUser(@RequestBody @Valid UserRequestContract request) { return userService.update(request); }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable("id") Long id) { userService.delete(id); }

    @GetMapping("/users")
    public List<User> getUsers(@RequestParam(required = false, defaultValue = "ASC") String direction, @RequestParam(required = false, defaultValue = "date") String attribute){
        return userService.list(direction, attribute);
    };

    // nějaké zvlášní - dodělat (nemáme více useru pro recipe, vždy jen jeden autor)
    @GetMapping("/users/forRecipe")
    public List<User> getUsersForRecipe(@RequestParam Long recipeId) { return userService.listByRecipe(recipeId); }
}
