package living.poetry.ofus.dto;

import living.poetry.ofus.domain.Article;
import living.poetry.ofus.domain.ArticleType;
import living.poetry.ofus.domain.TemplateType;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ArticleResponse {
    private Long id;
    private String title;
    private String content;
    private String writer;
    private TemplateType template;
    private ArticleType type;
    private LocalDateTime createdAt;

    public ArticleResponse(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.writer = article.getWriter();
        this.template = article.getTemplate();
        this.type = article.getType();
        this.createdAt = article.getCreatedAt();
    }
}