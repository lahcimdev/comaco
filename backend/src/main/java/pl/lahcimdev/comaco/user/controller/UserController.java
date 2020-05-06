package pl.lahcimdev.comaco.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.lahcimdev.comaco.dto.authenticateduser.AuthenticatedUserDto;
import pl.lahcimdev.comaco.security.JwtTokenService;
import pl.lahcimdev.comaco.user.domain.Role;
import pl.lahcimdev.comaco.user.service.UserService;

import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Method return AuthenticatedUserDTO from Token
    @PreAuthorize("isAuthenticated()")
    @GetMapping()
    public AuthenticatedUserDto getAuthenticatedUserDto() {
        return userService.getAuthenticatedUserDto();
    }

    // Method verify Token with SpringSecurity
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/verify-token")
    public void verifyToken() {
    }

    // Method return all Roles from database
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return userService.getAllRoles();
    }

    // Method return actual JWT expiration time
    @GetMapping("/token-expiration-time")
    public Integer getTokenExpirationTime() {
        return JwtTokenService.getTokenExpirationTime();
    }

    @DeleteMapping("/{id}/delete")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

}
