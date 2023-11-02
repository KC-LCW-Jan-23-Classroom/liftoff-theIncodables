package org.theincodables.rpgvibes.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class GameSession extends AbstractEntity{

    private String gameSessionName;

//    @OneToMany(mappedBy = "gameSession", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<MusicTrack> musicTracks = new ArrayList<>();

    private LocalDate dateCreated;

    @ManyToOne
    @JoinColumn(name = "campaign_id", referencedColumnName = "id")
    private Campaign campaign;  // Reference to the Campaign entity

    public GameSession() {}

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }

    public String getGameSessionName() {
        return gameSessionName;
    }

    public void setGameSessionName(String gameSessionName) {
        this.gameSessionName = gameSessionName;
    }

    public LocalDate getDate() {
        return dateCreated;
    }

    public void setDate(LocalDateTime date) {
        this.dateCreated = date.toLocalDate();
    }
}
