package org.theincodables.rpgvibes.models.dto;

public class MusicTracksDTO {

    private String title;
    private String trackUrl;
    private String freeSoundId;
    private Integer gameSessionId;

    public MusicTracksDTO(String title, String trackUrl) {
        this.title = title;
        this.trackUrl = trackUrl;
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

    public Integer getGameSessionId() {
        return gameSessionId;
    }

    public String getFreeSoundId() {
        return freeSoundId;
    }

    public void setFreeSoundId(String freeSoundId) {
        this.freeSoundId = freeSoundId;
    }
}

