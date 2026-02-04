package living.poetry.ofus.service;

import living.poetry.ofus.domain.*;
import living.poetry.ofus.dto.PoetryDto;
import living.poetry.ofus.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PoetryService {

    private final ArticleRepository articleRepository;

    @Transactional
    public Long createArticle(PoetryDto.CreateRequest req) {
        Article article = Article.builder()
                .title(req.getTitle())
                .content(req.getContent())
                .writer(req.getWriter())
                .template(req.getTemplate())
                .type(req.getType())
                .build();
        return articleRepository.save(article).getId();
    }

    @Transactional
    public void addRelayLine(Long articleId, PoetryDto.AddLineRequest req) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글입니다."));

        if(article.getType() != ArticleType.RELAY) {
            throw new IllegalArgumentException("릴레이 시가 아닙니다.");
        }

        RelayLine line = RelayLine.builder()
                .article(article)
                .content(req.getContent())
                .writer(req.getWriter())
                .build();

        article.getRelayLines().add(line);
    }

    @Transactional(readOnly = true)
    public List<PoetryDto.ListResponse> getList(ArticleType type) {
        return articleRepository.findByTypeOrderByCreatedAtDesc(type).stream()
                .map(PoetryDto.ListResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PoetryDto.DetailResponse getDetail(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글입니다."));
        return new PoetryDto.DetailResponse(article);
    }
}