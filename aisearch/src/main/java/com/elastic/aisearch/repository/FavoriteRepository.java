package com.elastic.aisearch.repository;

import com.elastic.aisearch.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {

    @Query("select s from Favorite s where s.user.id = ?1")
    List<Favorite> findAllUserFavorite(Integer userId);

    @Query("delete from Favorite s  where s.user.id = ?1")
    void deleteByUserId(Integer userId);

    @Query("select s from Favorite s where s.elasticId =?1 and s.user.id =?2")
    Optional<Favorite> findFavoriteByUserId(Integer elasticId, Integer userId);

    @Query("select s from Favorite s where s.id = ?1 and s.user.id = ?2")
    Boolean verifyIdOwner(Integer favId, Integer userId);
}
