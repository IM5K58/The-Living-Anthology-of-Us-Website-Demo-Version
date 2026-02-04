package living.poetry.ofus.dto;

import living.poetry.ofus.domain.ArticleType;
import living.poetry.ofus.domain.TemplateType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleRequest {
    private String title;
    private String content;
    private String writer;
    private TemplateType template; // VINTAGE or CLEAN
    private ArticleType type;      // ESSAY or RELAY
}