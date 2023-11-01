package org.theincodables.rpgvibes.data;

import org.springframework.stereotype.Repository;
import org.theincodables.rpgvibes.models.GameSession;

import java.util.List;

@Repository
public interface GameSessionRepository {
    List<GameSession> findByCampaignId(Integer campaignId);
}

