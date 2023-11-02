package org.theincodables.rpgvibes.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@Entity
public class User extends AbstractEntity {

    @NotNull
    private String username;
    @NotNull
    private String email;

    @NotNull
    private String pwHash;
    @OneToMany(mappedBy = "owner")
    private List<Campaign> campaigns = new ArrayList<>();;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User() {
    }

    public User(String username, String password, String email) {
        this.username = username;
        this.email = email;
        this.pwHash = encoder.encode(password);

    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public List<Campaign> getCampaigns() {
        return campaigns;
    }


    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwHash);
    }

}