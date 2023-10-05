package com.dihson103.onlinelearning.services;

import com.dihson103.onlinelearning.dto.user.UserRequest;
import com.dihson103.onlinelearning.dto.user.UserResponse;
import com.dihson103.onlinelearning.entities.UserEntity;
import com.dihson103.onlinelearning.repositories.UserRepository;
import com.dihson103.onlinelearning.services.impl.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static com.dihson103.onlinelearning.entities.Role.USER;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class IUserServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private ModelMapper modelMapper;
    @Mock
    private PasswordEncoder passwordEncoder;
    @InjectMocks
    private UserService underTest;
    private List<UserEntity> list;

    @BeforeEach
    void setUp() {
        UserEntity user = UserEntity.builder()
                .email("dinhson1032001@gmail.com")
                .username("dinhson103")
                .password("12345")
                .address("ha noi")
                .dob(new Date())
                .phone("0976099351")
                .role(USER)
                .status(true)
                .build();

        UserEntity user2 = UserEntity.builder()
                .email("dinhson@gmail.com")
                .username("son103")
                .password("12345")
                .address("ha noi")
                .dob(new Date())
                .phone("0976099351")
                .role(USER)
                .status(false)
                .build();

        list = List.of(user, user2);
    }

    @Test
    void getUserByUsername() {
        //given
        String username = "dinhson103";
        UserEntity user = UserEntity.builder()
                .email("dinhson1032001@gmail.com")
                .username(username)
                .password("12345")
                .address("ha noi")
                .dob(new Date())
                .phone("0976099351")
                .role(USER)
                .status(true)
                .build();

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

        UserResponse userResponseMock = UserResponse.builder().username(username).build();
        when(modelMapper.map(user, UserResponse.class)).thenReturn(userResponseMock);

        //when
        UserResponse userResponse = underTest.getUserByUsername(username);

        //then
        assertEquals(username, userResponse.getUsername(), "Username should be same.");

        verify(userRepository, times(1)).findByUsername(username);
    }

    @Test
    void canNotGetUserByUsername(){
        //given
        String username = "dihson103";
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        //when
        Exception exception = assertThrows(
                IllegalArgumentException.class,
                () -> underTest.getUserByUsername(username)
        );

        //then
        assertEquals(exception.getMessage(), "Can not find user has username: " + username);

        verify(userRepository, times(1)).findByUsername(username);
    }

    @Test
    void getUsers() {
        //given
        when(userRepository.findAllByStatusIsTrue()).thenReturn(list);

        //when
        List<UserResponse> users =  underTest.getUsers();

        //then
        assertFalse(users.isEmpty());
        assertEquals(list.size(), users.size());

        verify(userRepository, times(1)).findAllByStatusIsTrue();
    }

    @Test
    void canNotGetUsers(){
        //given
        when(userRepository.findAllByStatusIsTrue()).thenReturn(new ArrayList<>());

        //when
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            underTest.getUsers();
        });

        //then
        verify(userRepository, times(1)).findAllByStatusIsTrue();
    }

    @Test
    void register() {
        //given
        UserRequest userRequest = UserRequest.builder()
                .address(anyString())
                .phone("0976099351")
                .username(anyString())
                .password("123456")
                .dob(new Date())
                .build();

        //when
        underTest.register(userRequest);

        //then


    }

    @Test
    @Disabled
    void createUser() {
    }

    @Test
    @Disabled
    void deleteUser() {
    }



    @Test
    @Disabled
    void updateUser() {
    }

    @Test
    @Disabled
    void updateUserWithRole() {
    }
}