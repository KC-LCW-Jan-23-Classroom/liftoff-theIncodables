package org.theincodables.rpgvibes.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class GameSession extends AbstractEntity{

    private String gameSessionName;
    private String gameSessionDescription;

    @OneToMany(mappedBy = "gameSession", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MusicTracks> musicTracks = new ArrayList<>();

    private String date;

    @ManyToOne
    @JoinColumn(name = "campaign_id", referencedColumnName = "id")
    private Campaign campaign;  // Reference to the Campaign entity

    public GameSession() {}

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }

    public Campaign getCampaign() {
        return campaign;
    }

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

    public List<MusicTracks> getMusicTracks() {
        return musicTracks;
    }

    public void setMusicTracks(List<MusicTracks> musicTracks) {
        this.musicTracks = musicTracks;
    }

    public void addMusicTrack(MusicTracks musicTrack) {
        musicTracks.add(musicTrack);
        musicTrack.setGameSession(this);
    }

    public void removeMusicTrack(MusicTracks musicTrack) {
        musicTracks.remove(musicTrack);
        musicTrack.setGameSession(null);
    }
}
