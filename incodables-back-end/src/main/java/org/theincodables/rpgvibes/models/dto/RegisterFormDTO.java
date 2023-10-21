package org.theincodables.rpgvibes.models.dto;


public class RegisterFormDTO extends LoginFormDTO {
    public String verify;
    public String email;

    public RegisterFormDTO(String verify, String email, String username, String password) {
        super(username, password);
        this.verify = verify;
        this.email = email;
    }

    public String getVerifyPassword() {
        return verify;
    }

    public void setVerifyPassword(String verify) {
        this.verify = verify;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
