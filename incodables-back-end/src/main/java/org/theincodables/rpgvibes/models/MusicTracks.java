package org.theincodables.rpgvibes.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class MusicTracks extends AbstractEntity{
    private String title;
    private String trackUrl;
    private String freeSoundId;
    @ManyToOne
    @JoinColumn(name = "game_session_id", referencedColumnName = "id")
    @JsonIgnore
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

    public String getFreeSoundId() {
        return freeSoundId;
    }

    public void setFreeSoundId(String freeSoundId) {
        this.freeSoundId = freeSoundId;
    }
}
