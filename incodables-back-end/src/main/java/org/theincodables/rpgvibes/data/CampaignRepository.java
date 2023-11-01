package org.theincodables.rpgvibes.data;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.theincodables.rpgvibes.models.Campaign;
import org.theincodables.rpgvibes.models.User;

@Repository
public interface CampaignRepository extends CrudRepository<Campaign, Integer> {

}
