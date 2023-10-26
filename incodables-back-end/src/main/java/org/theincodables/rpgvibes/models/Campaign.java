package org.theincodables.rpgvibes.models;

import jakarta.validation.constraints.NotNull;

public class Campaign extends AbstractEntity {
    @NotNull
    private String campaignName;

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
}
