package swi.yumyumyardbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import swi.yumyumyardbackend.model.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findAllByRecipesId(Long id);
}
