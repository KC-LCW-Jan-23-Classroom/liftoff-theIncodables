package org.theincodables.rpgvibes.models.dto;

import java.sql.Date;

public class GameSessionDTO {
    private String gameSessionName;
    private String date;

    private Integer campaignId;

    public String getGameSessionName() {
        return gameSessionName;
    }

    public void setGameSessionName(String gameSessionName) {
        this.gameSessionName = gameSessionName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getCampaignId() {
        return campaignId;
    }
}
