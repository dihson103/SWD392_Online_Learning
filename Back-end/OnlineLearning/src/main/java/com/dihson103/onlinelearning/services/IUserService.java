package com.dihson103.onlinelearning.services;

import com.dihson103.onlinelearning.dto.user.UserRequest;
import com.dihson103.onlinelearning.dto.user.UserResponse;

import java.util.List;

public interface IUserService {

    void register(UserRequest userRequest);

    List<UserResponse> getUsers();

    void createUser(UserRequest userRequest);

    void deleteUser(Integer userId);

}
