package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.FavoriteDTO;
import com.elastic.aisearch.dto.Messages.SuccessMessageDTO;
import com.elastic.aisearch.entity.Favorite;
import com.elastic.aisearch.mappers.FavoriteMapper;
import com.elastic.aisearch.security.UserSession;
import com.elastic.aisearch.service.FavoriteService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@RestController
@RequestMapping("/favorite")
public class FavoriteController {
    private final FavoriteService favoriteService;
    private final UserSession userSession;
    private final FavoriteMapper favoriteMapper;

    @GetMapping()
    public List<FavoriteDTO> getFavorites() {
        List<FavoriteDTO> favorites = new ArrayList<>();
        List<Favorite> favoriteList;
        if (!Objects.isNull(userSession.getUserId())) {
            favoriteList = favoriteService.getFavorite(userSession.getUserId());
        } else {
            favoriteList = Collections.emptyList();
        }

        for (Favorite favorite: favoriteList) {
            FavoriteDTO favoriteDTO  = favoriteMapper.toDTO(favorite);
            favorites.add(favoriteDTO);
        }
        return favorites;
    }

    @PostMapping()
    public ResponseEntity<SuccessMessageDTO> setFavorite(@RequestBody FavoriteDTO favoriteDTO) {
        return ResponseEntity.ok().body(favoriteService.addFavorite(userSession.getUserId(), favoriteDTO));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> removeFavorite(@PathVariable Integer id) {
        return ResponseEntity.ok().body(favoriteService.deleteFavoriteById(id, userSession.getUserId()));
    }
}