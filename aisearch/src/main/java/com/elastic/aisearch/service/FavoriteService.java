package com.elastic.aisearch.service;

import com.elastic.aisearch.dto.FavoriteDTO;
import com.elastic.aisearch.dto.Messages.FailMessageDTO;
import com.elastic.aisearch.dto.Messages.SuccessMessageDTO;
import com.elastic.aisearch.entity.Favorite;
import com.elastic.aisearch.exceptions.OperationNotAllowed;
import com.elastic.aisearch.mappers.FavoriteMapper;
import com.elastic.aisearch.repository.FavoriteRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final FavoriteMapper favoriteMapper;
    private final UserService userService;

    public List<Favorite> getFavorite(Integer id) {
        return favoriteRepository.findAllUserFavorite(id);
    }

    public SuccessMessageDTO addFavorite(Integer id, FavoriteDTO favoriteDTO) {
        Optional<Favorite> favoriteUser = favoriteRepository.findFavoriteByUserId(favoriteDTO.elasticId(), id);
        if (favoriteUser.isPresent()) {
            throw new IllegalStateException("failed_setfavorite");
        }
        Favorite favorite = favoriteMapper.toObject(favoriteDTO);
        favorite.setUser(userService.fetchUserById(id));
        favoriteRepository.save(favorite);
        return new SuccessMessageDTO("success_setfavorite");
    }

    public SuccessMessageDTO deleteFavoriteById(Integer id, Integer userId) {
        if (favoriteRepository.verifyIdOwner(id, userId).isPresent()) {
            throw new OperationNotAllowed("not_allowed");
        }
        
        favoriteRepository.deleteById(id);
        return new SuccessMessageDTO("success_delete");
    }

    public SuccessMessageDTO deleteFavoriteByUserId(Integer id) {
        favoriteRepository.deleteByUserId(id);
        return new SuccessMessageDTO("success_delete");
    }
}
