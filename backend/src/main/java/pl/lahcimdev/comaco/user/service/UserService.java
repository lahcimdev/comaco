package pl.lahcimdev.comaco.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.lahcimdev.comaco.dto.authenticateduser.AuthenticatedUserDto;
import pl.lahcimdev.comaco.dto.authenticateduser.AuthenticatedUserDtoMapper;
import pl.lahcimdev.comaco.security.JwtTokenService;
import pl.lahcimdev.comaco.user.domain.Role;
import pl.lahcimdev.comaco.user.domain.UserType;
import pl.lahcimdev.comaco.user.repository.RoleRepository;
import pl.lahcimdev.comaco.user.repository.UserRepository;

import javax.persistence.EntityNotFoundException;
import javax.validation.Validation;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private AuthenticatedUserDtoMapper authenticatedUserDtoMapper;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository, AuthenticatedUserDtoMapper authenticatedUserDtoMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.authenticatedUserDtoMapper = authenticatedUserDtoMapper;
    }

    public AuthenticatedUserDto getAuthenticatedUserDto() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserType userType = userRepository.findByUsername(username)
                .map(user -> user.getUserType())
                .orElseThrow(
                        () -> new EntityNotFoundException("User doesn't exist in database")
                );
        if (userType == UserType.EMPLOYEE) {
            return authenticatedUserDtoMapper.mapEmployeeToAuthenticatedUserDto(username);
        }
        if (userType == UserType.CUSTOMER) {
            return authenticatedUserDtoMapper.mapCustomerToAuthenticatedUserDto(username);
        }
        throw new EntityNotFoundException("User exist in database but has invalid type");
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public void deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        }

    }
}
