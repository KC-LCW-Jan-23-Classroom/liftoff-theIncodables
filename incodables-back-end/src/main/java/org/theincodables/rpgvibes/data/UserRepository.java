package org.theincodables.rpgvibes.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.theincodables.rpgvibes.models.User;
@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsername(String username);

}
