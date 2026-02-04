package living.poetry.ofus.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import living.poetry.ofus.domain.Article;

@Getter
@AllArgsConstructor
public class ArticleListResponse {
    private Long id;
    private String title;
    private String writer;

    public static ArticleListResponse from(Article article) {
        return new ArticleListResponse(
                article.getId(),
                article.getTitle(),
                article.getWriter()
        );
    }
}