package com.vidmantas.saulius.examtask.dao;

import com.vidmantas.saulius.examtask.entity.ArticleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleDao extends JpaRepository<ArticleEntity, Long> {

}
