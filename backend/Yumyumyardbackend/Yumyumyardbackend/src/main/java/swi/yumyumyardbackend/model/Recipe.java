package swi.yumyumyardbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import swi.yumyumyardbackend.contract.RecipeRequestContract;
import java.util.Set;

@Entity
@Table(name = "Recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String description;

    // Pridaný atribút pre autora typu String
    @NotNull
    private String author;

    // Vytvorenie vzťahu "Many-to-One" s entitou User

    @ManyToOne
    @JoinTable(name = "RecipeAuthor",
            joinColumns = @JoinColumn(name = "RecipeId"),
            inverseJoinColumns = @JoinColumn(name = "UserId")
    )
    private User user;

    public Recipe() {
    }

    public Recipe(RecipeRequestContract recipe) {
        this.name = recipe.getName();
        this.description = recipe.getDescription();
        this.author = recipe.getAuthor(); // Nastavenie autora z receptu
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Getter a setter pre autora
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    // Getter a setter pre user
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
