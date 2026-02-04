package living.poetry.ofus.repository;

import living.poetry.ofus.domain.Article;
import living.poetry.ofus.domain.ArticleType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByTypeOrderByCreatedAtDesc(ArticleType type);
}