package com.dihson103.onlinelearning.repositories;

import com.dihson103.onlinelearning.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByUsername(String username);

    List<UserEntity> findAllByStatusIsTrue();

    Optional<UserEntity> findByIdAndStatusIsTrue(Integer userId);

}
