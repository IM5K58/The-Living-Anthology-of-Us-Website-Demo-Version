package living.poetry.ofus.service;

import living.poetry.ofus.domain.Article;
import living.poetry.ofus.domain.ArticleType;
import living.poetry.ofus.dto.ArticleRequest;
import living.poetry.ofus.dto.ArticleResponse;
import living.poetry.ofus.dto.ArticleListResponse;
import living.poetry.ofus.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArticleService {

    private final ArticleRepository articleRepository;

    // 글 작성
    @Transactional
    public Long createArticle(ArticleRequest request) {
        Article article = Article.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .writer(request.getWriter())
                .template(request.getTemplate())
                .type(request.getType())
                .build();

        return articleRepository.save(article).getId();
    }

    // 리스트 조회 메서드 수정
    public Page<ArticleListResponse> findAll(ArticleType type, Pageable pageable) {
        Page<Article> articles;

        if (type != null) {
            articles = articleRepository.findByType(type, pageable);
        } else {
            articles = articleRepository.findAll(pageable);
        }

        // 엔티티 Page를 DTO Page로 변환 (.map 사용)
        return articles.map(ArticleListResponse::from);
    }

    // 상세 조회
    public ArticleResponse getArticleDetail(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 글을 찾을 수 없습니다. id=" + id));
        return new ArticleResponse(article);
    }
}