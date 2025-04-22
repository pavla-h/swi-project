package swi.yumyumyardbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import swi.yumyumyardbackend.contract.UserRequestContract;

import java.util.Set;

@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    private String username;
    private String name;

    private String email;

    public User() {
    }

    public User(UserRequestContract request) {
        id = request.getId();
        username = request.getUsername();
        name = request.getName();
        email = request.getEmail();
    }

    @OneToMany
    @JoinTable(name = "RecipeAuthor",
            joinColumns = @JoinColumn(name = "UserId"),
            inverseJoinColumns = @JoinColumn(name = "RecipeId")
    )

    private Set<Recipe> recipes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(Set<Recipe> recipes) {
        this.recipes = recipes;
    }
}
