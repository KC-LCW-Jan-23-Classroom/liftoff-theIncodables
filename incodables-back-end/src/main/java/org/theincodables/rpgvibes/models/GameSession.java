package org.theincodables.rpgvibes.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.sql.Date;

@Entity
public class GameSession extends AbstractEntity{

    private String gameSessionName;

//    @OneToMany(mappedBy = "gameSession", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<MusicTrack> musicTracks = new ArrayList<>();

    private Date date;

    @ManyToOne
    @JoinColumn(name = "campaign_id", referencedColumnName = "id")
    private Campaign campaign;  // Reference to the Campaign entity

    public GameSession() {}

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
}
