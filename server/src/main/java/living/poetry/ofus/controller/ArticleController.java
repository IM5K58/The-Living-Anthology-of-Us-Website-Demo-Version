package living.poetry.ofus.controller;

import living.poetry.ofus.domain.ArticleType;
import living.poetry.ofus.dto.ArticleRequest;
import living.poetry.ofus.dto.ArticleResponse;
import living.poetry.ofus.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // 프론트엔드 포트 허용
public class ArticleController {

    private final ArticleService articleService;

    // 1. 글 작성 (POST /api/articles)
    @PostMapping
    public ResponseEntity<Long> createArticle(@RequestBody ArticleRequest request) {
        Long articleId = articleService.createArticle(request);
        return ResponseEntity.ok(articleId);
    }

    // 2. 글 목록 조회 (GET /api/articles?type=ESSAY)
    @GetMapping
    public ResponseEntity<List<ArticleResponse>> getArticles(
            @RequestParam(defaultValue = "ESSAY") ArticleType type) {
        List<ArticleResponse> articles = articleService.getArticles(type);
        return ResponseEntity.ok(articles);
    }

    // 3. 글 상세 조회 (GET /api/articles/{id})
    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> getArticle(@PathVariable Long id) {
        ArticleResponse article = articleService.getArticleDetail(id);
        return ResponseEntity.ok(article);
    }
}