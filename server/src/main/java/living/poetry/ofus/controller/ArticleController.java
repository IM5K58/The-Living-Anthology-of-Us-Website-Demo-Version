package living.poetry.ofus.controller;

import living.poetry.ofus.domain.ArticleType;
import living.poetry.ofus.dto.ArticleRequest;
import living.poetry.ofus.dto.ArticleResponse;
import living.poetry.ofus.dto.ArticleListResponse;
import living.poetry.ofus.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    // 요청 예시: GET /api/articles?type=ESSAY&page=0&size=6
    @GetMapping
    public ResponseEntity<Page<ArticleListResponse>> getAllArticles(
            @RequestParam(required = false) ArticleType type,
            @RequestParam(defaultValue = "0") int page, // 기본 0페이지 (첫 페이지)
            @RequestParam(defaultValue = "6") int size  // 기본 6개씩
    ) {
        // id 기준 내림차순 정렬 (최신글이 먼저 오도록)
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        Page<ArticleListResponse> articles = articleService.findAll(type, pageable);
        return ResponseEntity.ok(articles);
    }

    // 3. 글 상세 조회 (GET /api/articles/{id})
    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> getArticle(@PathVariable Long id) {
        ArticleResponse article = articleService.getArticleDetail(id);
        return ResponseEntity.ok(article);
    }
}