package swi.yumyumyardbackend.contract;

import jakarta.validation.constraints.NotNull;
import swi.yumyumyardbackend.model.User;

public class RecipeRequestContract {
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private String description;
    @NotNull
    private  String author;

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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
