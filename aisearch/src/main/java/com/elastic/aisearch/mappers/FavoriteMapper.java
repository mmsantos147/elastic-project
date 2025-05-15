package com.elastic.aisearch.mappers;

import com.elastic.aisearch.dto.FavoriteDTO;
import com.elastic.aisearch.entity.Favorite;
import org.springframework.stereotype.Component;

@Component
public class FavoriteMapper {

    public Favorite toObject(FavoriteDTO favoriteDTO) {
        return new Favorite(
                favoriteDTO.title(),
                favoriteDTO.url(),
                favoriteDTO.content(),
                favoriteDTO.readingTime(),
                favoriteDTO.date(),
                favoriteDTO.elasticId()
        );
    }

    public FavoriteDTO toDTO(Favorite favorite) {
        return new FavoriteDTO(
                favorite.getElasticId(),
                favorite.getTitle(),
                favorite.getUrl(),
                favorite.getContent(),
                favorite.getReadingTime(),
                favorite.getDate());
    }
}
