package pl.lahcimdev.comaco.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lahcimdev.comaco.dto.authenticateduser.AuthenticatedUserDto;
import pl.lahcimdev.comaco.user.service.UserService;

import java.util.Map;

@RestController
@RequestMapping("api/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping()
    public AuthenticatedUserDto getAuthenticatedUserDto() {
        return userService.getAuthenticatedUserDto();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/verifyToken")
    public Map<String, Integer> verifyToken() {
        return userService.verifyToken();
    }


}
