package pl.lahcimdev.comaco.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.lahcimdev.comaco.customer.domain.Customer;
import pl.lahcimdev.comaco.dto.authenticateduser.AuthenticatedUserDto;
import pl.lahcimdev.comaco.dto.authenticateduser.AuthenticatedUserDtoMapper;
import pl.lahcimdev.comaco.employee.domain.Employee;
import pl.lahcimdev.comaco.service.UserPhotoService;
import pl.lahcimdev.comaco.user.domain.Role;
import pl.lahcimdev.comaco.user.domain.User;
import pl.lahcimdev.comaco.user.domain.UserType;
import pl.lahcimdev.comaco.user.repository.RoleRepository;
import pl.lahcimdev.comaco.user.repository.UserRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private AuthenticatedUserDtoMapper authenticatedUserDtoMapper;
    private UserPhotoService userPhotoService;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository, AuthenticatedUserDtoMapper authenticatedUserDtoMapper, UserPhotoService userPhotoService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.authenticatedUserDtoMapper = authenticatedUserDtoMapper;
        this.userPhotoService = userPhotoService;
    }

    public AuthenticatedUserDto getAuthenticatedUserDto() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserType userType = userRepository.findByUsername(username)
                .map(user -> user.getUserType())
                .orElseThrow(
                        () -> new EntityNotFoundException("User doesn't exist in database or doesnt' have UserType")
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
        User user = userRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("User doesn't exist in database")
        );
        userRepository.deleteById(id);
        if (user instanceof Employee) {
            userPhotoService.deleteUserDirectory(UserType.EMPLOYEE, user.getId());
        }

    }
}
