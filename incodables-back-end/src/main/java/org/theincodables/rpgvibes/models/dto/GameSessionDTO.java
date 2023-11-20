package org.theincodables.rpgvibes.models.dto;

public class GameSessionDTO {
    private String gameSessionName;
    private String gameSessionDescription;
    private String date;

    private Integer campaignId;

    public String getGameSessionName() {
        return gameSessionName;
    }

    public void setGameSessionName(String gameSessionName) {
        this.gameSessionName = gameSessionName;
    }

    public String getGameSessionDescription() {
        return gameSessionDescription;
    }

    public void setGameSessionDescription(String gameSessionDescription) {
        this.gameSessionDescription = gameSessionDescription;
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
