package pl.lahcimdev.comaco.dto.authenticateduser;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.lahcimdev.comaco.user.domain.Role;
import pl.lahcimdev.comaco.user.domain.UserType;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor

public class AuthenticatedUserDto {

    private String username;
    private UserType userType;
    private List<Role> roles;
    private String firstName;
    private String lastName;
    private String photo;

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
