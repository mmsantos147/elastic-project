package com.elastic.aisearch.repository;

import com.elastic.aisearch.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("select s from User s where s.email = ?1")
    Optional<User> findUserByEmail(String email);
}