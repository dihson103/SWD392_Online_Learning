package com.dihson103.onlinelearning.services.impl;

import com.dihson103.onlinelearning.dto.user.UserRequest;
import com.dihson103.onlinelearning.dto.user.UserResponse;
import com.dihson103.onlinelearning.dto.user.UserUpdateRequest;
import com.dihson103.onlinelearning.entities.Role;
import com.dihson103.onlinelearning.entities.UserEntity;
import com.dihson103.onlinelearning.repositories.UserRepository;
import com.dihson103.onlinelearning.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static com.dihson103.onlinelearning.entities.Role.USER;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    private Boolean isEmailExist(String email){
        return userRepository.findByEmail(email).isPresent();
    };

    private Boolean isUserNameExist(String username){
        return userRepository.findByUsername(username).isPresent();
    };

    private void saveUser(UserEntity user, Role role){
        user.setRole(role);
        user.setStatus(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    private UserEntity getUserEntity(UserRequest userRequest){
        if(isEmailExist(userRequest.getEmail())){
            throw new IllegalArgumentException("Email is already exist.");
        }
        if(isUserNameExist(userRequest.getPassword())){
            throw new IllegalArgumentException("Username is already exist.");
        }
        return modelMapper.map(userRequest, UserEntity.class);
    }

    @Override
    public void register(UserRequest userRequest) {
        UserEntity user = getUserEntity(userRequest);
        saveUser(user, USER);
    }

    @Override
    public List<UserResponse> getUsers() {
        List<UserEntity> users = userRepository.findAllByStatusIsTrue();
        if(users.isEmpty()) throw new IllegalArgumentException("Can not find any users.");
        return users.stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .toList();
    }

    @Override
    public void createUser(UserRequest userRequest, String role) {
        UserEntity user = getUserEntity(userRequest);
        saveUser(user, getRole(role));
    }

    private Role getRole(String role){
        return Arrays.stream(Role.values())
                .filter(r -> r.name().equals(role.toUpperCase()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Role does not already exist."));
    }

    @Override
    public void deleteUser(Integer userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Can not find user has id: " + userId));
        user.setStatus(false);
        userRepository.save(user);
    }

    @Override
    public UserResponse getUserByUsername(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Can not find user has username: " + username));
        return modelMapper.map(user, UserResponse.class);
    }

    private Optional<UserEntity> getUserById(Integer userId){
        return userRepository.findFirstByIdAndStatusIsTrue(userId);
    }

    private void checkUpdateUserValid(UserEntity oldUSer, UserEntity newUser){
        if(!oldUSer.getUsername().equals(newUser.getUsername())){
            if(isUserNameExist(newUser.getUsername())){
                throw new IllegalArgumentException("Username is already exist.");
            }
        } else if (!oldUSer.getEmail().equals(newUser.getEmail())) {
            if(isEmailExist(newUser.getEmail())){
                throw new IllegalArgumentException("Email is already exist.");
            }
        }
    }

    private UserEntity update(UserUpdateRequest userRequest){
        UserEntity oldUser = getUserById(userRequest.getId())
                .orElseThrow(() -> new IllegalArgumentException("Can not find user with id: " + userRequest.getId()));
        UserEntity newUser = modelMapper.map(userRequest, UserEntity.class);
        checkUpdateUserValid(oldUser, newUser);
        newUser.setPassword(oldUser.getPassword());
        newUser.setStatus(true);
        return newUser;
    }

    @Override
    public void updateUser(UserUpdateRequest userRequest) {
        userRepository.save(update(userRequest));
    }

    @Override
    public void updateUserWithRole(UserUpdateRequest userUpdateRequest, String role) {
        UserEntity user = update(userUpdateRequest);
        user.setRole(getRole(role));
        userRepository.save(user);
    }
}
