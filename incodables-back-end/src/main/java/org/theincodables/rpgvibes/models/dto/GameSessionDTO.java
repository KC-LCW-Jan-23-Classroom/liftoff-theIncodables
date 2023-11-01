package org.theincodables.rpgvibes.models.dto;

import java.sql.Date;

public class GameSessionDTO {
    private String gameSessionName;
    private Date date;

    private Integer campaignId;

    public String getGameSessionName() {
        return gameSessionName;
    }

    public void setGameSessionName(String gameSessionName) {
        this.gameSessionName = gameSessionName;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }


    public Integer getCampaignId() {
        return campaignId;
    }
}
