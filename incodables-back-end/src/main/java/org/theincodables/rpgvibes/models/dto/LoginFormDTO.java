package org.theincodables.rpgvibes.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public class LoginFormDTO {

    @NotNull//not-null fields must be initialized error. Want to ask TAs about this.
    @NotBlank
    @Size(min = 3, max = 20, message = "Invalid username. Must be between 3 and 30 characters.")
    private String username;

    @NotNull
    @NotBlank
    @Size(min = 5, max = 20, message = "Invalid password. Must be between 5 and 30 characters.")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
