package living.poetry.ofus.repository;

import living.poetry.ofus.domain.Article;
import living.poetry.ofus.domain.ArticleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findByType(ArticleType type, Pageable pageable);
}