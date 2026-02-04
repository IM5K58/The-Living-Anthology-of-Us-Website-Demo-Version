package living.poetry.ofus.dto;

import living.poetry.ofus.domain.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class PoetryDto {

    @Data
    public static class CreateRequest {
        private String title;
        private String content;
        private String writer;
        private TemplateType template;
        private ArticleType type;
    }

    @Data
    public static class AddLineRequest {
        private String content;
        private String writer;
    }

    @Data
    public static class ListResponse {
        private Long id;
        private String title;
        private String writer;
        private ArticleType type;
        private LocalDateTime createdAt;

        public ListResponse(Article article) {
            this.id = article.getId();
            this.title = article.getTitle();
            this.writer = article.getWriter();
            this.type = article.getType();
            this.createdAt = article.getCreatedAt();
        }
    }

    @Data
    public static class DetailResponse {
        private Long id;
        private String title;
        private String content;
        private String writer;
        private TemplateType template;
        private ArticleType type;
        private LocalDateTime createdAt;
        private List<LineDto> relayLines;

        public DetailResponse(Article article) {
            this.id = article.getId();
            this.title = article.getTitle();
            this.content = article.getContent();
            this.writer = article.getWriter();
            this.template = article.getTemplate();
            this.type = article.getType();
            this.createdAt = article.getCreatedAt();
            this.relayLines = article.getRelayLines().stream()
                    .map(LineDto::new)
                    .collect(Collectors.toList());
        }
    }

    @Data
    public static class LineDto {
        private Long lineId;
        private String content;
        private String writer;

        public LineDto(RelayLine line) {
            this.lineId = line.getId();
            this.content = line.getContent();
            this.writer = line.getWriter();
        }
    }
}