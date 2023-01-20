package com.vidmantas.saulius.examtask.controller;


import com.vidmantas.saulius.examtask.ExamtaskApplication;
import com.vidmantas.saulius.examtask.dao.ArticleDao;
import com.vidmantas.saulius.examtask.entity.ArticleEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


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
        //System.out.println("Posting stuff");
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
                System.out.println("Saving entity " + articleDataBase.findAll().size());
            }
            else {
                System.out.println("Already present entity " + articleDataBase.findAll().size());
            }
        }
    }

    @GetMapping("/delete-article")
    public void deleteArticle() {
        System.out.println("Deleting stuff");
        articleDataBase.deleteById(1L);
    }

    @GetMapping("/get-articles")
    public List<ArticleEntity> getArticles() {
       //System.out.println("Getting articles");
        return articleDataBase.findAll();
    }

    @GetMapping("/get-article/{articleID}")
    public ArticleEntity getArticleEntity(@PathVariable String articleID) {

        System.out.println(articleID + " getting article ID");
        Long longID = Long.valueOf(articleID);

        Optional<ArticleEntity> foundArticleEntity = articleDataBase.findAll().stream()
                .filter(ae -> ae.getId() == longID)
                .findFirst();

        if (foundArticleEntity.isPresent()) {
            System.out.println("Entity is present" + articleDataBase.findAll().size());
            return foundArticleEntity.get();
        }
        else {
            System.out.println("Entity is not present" + articleDataBase.findAll().size());
            return null;
        }
    }
}
