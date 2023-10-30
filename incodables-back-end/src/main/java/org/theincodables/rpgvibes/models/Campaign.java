package org.theincodables.rpgvibes.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

@Entity
public class Campaign extends AbstractEntity {
    @NotNull
    private String campaignName;
    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
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

//    public Object getOwner() {
//        return owner;
//    }
}
