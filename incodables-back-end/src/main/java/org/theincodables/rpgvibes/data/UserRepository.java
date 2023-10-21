package org.theincodables.rpgvibes.data;

import org.springframework.data.repository.CrudRepository;
import org.theincodables.rpgvibes.models.User;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsername(String username);

}
