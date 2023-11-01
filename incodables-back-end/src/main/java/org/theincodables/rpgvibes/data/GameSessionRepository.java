package org.theincodables.rpgvibes.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.theincodables.rpgvibes.models.GameSession;

import java.util.List;

@Repository
public interface GameSessionRepository  extends CrudRepository<GameSession, Integer> {
    List<GameSession> findByCampaignId(Integer campaignId);
}

