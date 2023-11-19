package org.theincodables.rpgvibes.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class MusicTracks extends AbstractEntity{
    private String title;
    private String trackUrl;

    @ManyToOne
    @JoinColumn(name = "game_session_id", referencedColumnName = "id")
    private GameSession gameSession;

    public GameSession getGameSession() {
        return gameSession;
    }

    public void setGameSession(GameSession gameSession) {
        this.gameSession = gameSession;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTrackUrl() {
        return trackUrl;
    }

    public void setTrackUrl(String trackUrl) {
        this.trackUrl = trackUrl;
    }
}
