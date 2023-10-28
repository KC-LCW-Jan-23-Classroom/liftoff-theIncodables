package org.theincodables.rpgvibes.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
@Entity
public class Campaign extends AbstractEntity {
    @NotNull
    private String campaignName;
    @ManyToOne
    private User owner;


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
