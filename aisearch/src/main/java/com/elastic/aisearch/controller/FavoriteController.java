package com.elastic.aisearch.controller;

import com.elastic.aisearch.dto.FavoriteDTO;
import com.elastic.aisearch.entity.Favorite;
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
            FavoriteDTO favoriteDTO  = new FavoriteDTO(
                    favorite.getElasticId(),
                    favorite.getTitle(),
                    favorite.getUrl(),
                    favorite.getContent(),
                    favorite.getReadingTime(),
                    favorite.getDate());
            favorites.add(favoriteDTO);
        }
        return favorites;
    }

    @PostMapping()
    public ResponseEntity<?> setFavorite(@RequestBody FavoriteDTO favoriteDTO) {
        return ResponseEntity.ok().body(favoriteService.addFavorite(userSession.getUserId(), favoriteDTO));
    }

    @PostMapping(path = "/{id}")
    public ResponseEntity<?> removeFavorite(@PathVariable Integer id) {
        favoriteService.deleteFavoriteById(id);
        return ResponseEntity.ok().body("success_remove");
    }
}