package living.poetry.ofus.service;

import living.poetry.ofus.domain.Article;
import living.poetry.ofus.domain.ArticleType;
import living.poetry.ofus.dto.ArticleRequest;
import living.poetry.ofus.dto.ArticleResponse;
import living.poetry.ofus.dto.ArticleListResponse;
import living.poetry.ofus.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
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
    // 글 목록 조회 로직
    public List<ArticleListResponse> findAll() {
        return articleRepository.findAll().stream()
                .map(ArticleListResponse::from)
                .collect(Collectors.toList());
    }

    // 상세 조회
    public ArticleResponse getArticleDetail(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 글을 찾을 수 없습니다. id=" + id));
        return new ArticleResponse(article);
    }
}