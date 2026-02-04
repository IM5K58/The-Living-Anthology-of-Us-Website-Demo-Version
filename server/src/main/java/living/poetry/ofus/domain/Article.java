package living.poetry.ofus.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "articles")
@Getter @NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor @Builder
public class Article {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content; // 일반 시는 본문, 릴레이 시는 첫 시작 문장

    private String writer;

    @Enumerated(EnumType.STRING)
    private TemplateType template; // VINTAGE, CLEAN

    @Enumerated(EnumType.STRING)
    private ArticleType type; // STANDARD, RELAY

    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    @Builder.Default
    private List<RelayLine> relayLines = new ArrayList<>();
}