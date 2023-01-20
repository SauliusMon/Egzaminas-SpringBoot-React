package com.vidmantas.saulius.examtask.controller;


import com.vidmantas.saulius.examtask.dao.ArticleDao;
import com.vidmantas.saulius.examtask.entity.ArticleEntity;
import com.vidmantas.saulius.examtask.entity.Comment;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@CrossOrigin//("http://localhost:8080")
@RestController
@RequestMapping("/api/v1")
public class ArticleController {

    private ArticleDao articleDataBase;

    public ArticleController(ArticleDao articleDataBase) {
        this.articleDataBase = articleDataBase;
    }


    @GetMapping
    public List<ArticleEntity> getMapping() {
        return articleDataBase.findAll();
    }

    @GetMapping("/post-article")
    public void mappingPostArticle() {
        articleDataBase.save(new ArticleEntity("Name", "Good description", null));
    }

    private Example<ArticleEntity> findByName = new Example<ArticleEntity>() {
        @Override
        public ArticleEntity getProbe() {
            return null;
        }

        @Override
        public ExampleMatcher getMatcher() {
            return null;
        }
    };

    @PostMapping("/post-article")
    public void postArticle(@RequestBody ArticleEntity articleEntity) {
        if (articleEntity.getName() != null && !articleEntity.getName().isEmpty()) {
            Optional<ArticleEntity> foundArticleEntity = articleDataBase.findAll().stream()
                    .filter(ae -> ae.getName().equals(articleEntity.getName()))
                    .findFirst();

            if (!foundArticleEntity.isPresent()) {
                articleEntity.setCurrentPublishDate();

                articleDataBase.save(articleEntity);
            }
            else {
                System.out.println("Already present entity " + articleDataBase.findAll().size());
            }
        }
    }

    private static final Comparator<ArticleEntity> sortEntitiesByDate = new Comparator<ArticleEntity>() {
        @Override
        public int compare(ArticleEntity o1, ArticleEntity o2) {
            return o1.getPublishDate().compareTo(o2.getPublishDate());
        }
    };

    @GetMapping("/get-articles")
    public List<ArticleEntity> getArticles() {
        return articleDataBase.findAll().stream().sorted(sortEntitiesByDate).collect(Collectors.toList());
    }

    @GetMapping("/get-article/{articleID}")
    public ArticleEntity getArticleEntity(@PathVariable String articleID) {
        System.out.println(articleID + " getting article ID");
        Long longID = Long.valueOf(articleID);

        Optional<ArticleEntity> foundArticleEntity = articleDataBase.findAll().stream()
                .filter(ae -> ae.getId() == longID)
                .findFirst();

        if (foundArticleEntity.isPresent()) {
            return foundArticleEntity.get();
        }
        else {
            return null;
        }
    }

    @GetMapping("/article-comments/{articleID}")
    public List<Comment> getComments (@PathVariable String articleID) {
        System.out.println(articleID + " comment getting article ID");
        Long longID = Long.valueOf(articleID);
        List<Comment> gettingComments = articleDataBase.findById(longID).get().getComments();
        if (!gettingComments.isEmpty()) {
            return gettingComments;
        }
        return null;
    }

    @PostMapping("/article_comments/{articleID}")
    public void addComment (@RequestBody Comment commentForPost, @PathVariable String articleID) {
        System.out.println(articleID + " comment getting article ID");
        Long longID = Long.valueOf(articleID);

        Optional<ArticleEntity> articleEntity = articleDataBase.findById(longID).stream().findFirst();
        if (articleEntity.isPresent()) {
            articleEntity.get().addComment(commentForPost);
        }
    }
}
