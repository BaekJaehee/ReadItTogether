package com.ssafy.rit.back.repository;

import com.ssafy.rit.back.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Integer> {
}
