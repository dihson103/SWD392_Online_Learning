package com.dihson103.onlinelearning.services.impl;

import com.dihson103.onlinelearning.dto.user.UserRequest;
import com.dihson103.onlinelearning.dto.user.UserResponse;
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

    private void saveUser(UserEntity user){
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
        user.setRole(USER);
        saveUser(user);
    }

    @Override
    public List<UserResponse> getUsers() {
        List<UserEntity> users = userRepository.findAll();
        if(users.isEmpty()) throw new IllegalArgumentException("Can not find any users.");
        return users.stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .toList();
    }

    @Override
    public void createUser(UserRequest userRequest) {
        UserEntity user = getUserEntity(userRequest);
        saveUser(user);
    }

    @Override
    public void deleteUser(Integer userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Can not find user has id: " + userId));
        userRepository.delete(user);
    }
}
