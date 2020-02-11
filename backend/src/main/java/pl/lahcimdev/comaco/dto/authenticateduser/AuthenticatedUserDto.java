package pl.lahcimdev.comaco.dto.authenticateduser;

import pl.lahcimdev.comaco.user.domain.Role;
import pl.lahcimdev.comaco.user.domain.UserType;

import java.util.List;

public class AuthenticatedUserDto {

    private String username;
    private UserType userType;
    private List<Role> roles;
    private String firstName;
    private String lastName;
    private String photo;

    public AuthenticatedUserDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("AuthenticatedUserDto{");
        sb.append("username='").append(username).append('\'');
        sb.append(", userType=").append(userType);
        sb.append(", roles=").append(roles);
        sb.append(", firstName='").append(firstName).append('\'');
        sb.append(", lastName='").append(lastName).append('\'');
        sb.append(", photo='").append(photo).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
