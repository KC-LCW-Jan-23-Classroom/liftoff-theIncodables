package org.theincodables.rpgvibes.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.theincodables.rpgvibes.models.Campaign;

@Repository
public interface CampaignRepository extends CrudRepository<Campaign, Integer> {

}
