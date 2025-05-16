package com.elastic.aisearch.repository;

import com.elastic.aisearch.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Integer> {
    @Query("select s from History s where s.user.id = ?1 ORDER BY s.id desc")
    List<History> findMostRecentHistory(Integer userId);

    @Modifying
    @Transactional
    @Query("delete from History s where s.user.id =?1")
    void deleteAllByUserId(Integer userId);

    @Query("select s from History s where s.id = ?1 and s.user.id = ?2")
    Boolean verifyIdOwner(Integer histId, Integer userId);
}
