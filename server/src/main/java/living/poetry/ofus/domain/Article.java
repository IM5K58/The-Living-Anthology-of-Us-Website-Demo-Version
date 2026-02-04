package living.poetry.ofus.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Table(name = "articles")
public class Article {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false, length = 50)
    private String writer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TemplateType template;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ArticleType type;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    // 릴레이 글일 경우 이어지는 문장들
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RelayLine> relayLines = new ArrayList<>();

    @Builder
    public Article(String title, String content, String writer, TemplateType template, ArticleType type) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.template = template;
        this.type = type != null ? type : ArticleType.ESSAY; // 기본값 ESSAY
    }
}