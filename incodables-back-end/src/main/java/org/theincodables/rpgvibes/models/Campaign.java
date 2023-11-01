package org.theincodables.rpgvibes.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Campaign extends AbstractEntity {
    @NotNull
    private String campaignName;
    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private User owner;

    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GameSession> gameSessions = new ArrayList<>();


    public Campaign() {}

    public Campaign(@NotNull String campaignName) {
        this.campaignName = campaignName;
    }

    public String getCampaignName() {
        return campaignName;
    }

    public void setCampaignName(String campaignName) {
        this.campaignName = campaignName;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }


}
