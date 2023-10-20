package org.theincodables.rpgvibes.models.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


//@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include =
//        JsonTypeInfo.As.PROPERTY, property = "username")
//@JsonDeserialize(using = LoginFormDeserializer.class)
public class LoginFormDTO {


    public String username;

    public String password;

    public LoginFormDTO( String username,String password) {
        this.username = username;
        this.password = password;
    }


    //@JsonGetter("username")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    //@JsonGetter("password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return this.password + ", " + this.username;
    }

}
