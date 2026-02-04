package living.poetry.ofus.controller;

import living.poetry.ofus.domain.ArticleType;
import living.poetry.ofus.dto.PoetryDto;
import living.poetry.ofus.service.PoetryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/poems")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PoetryController {

    private final PoetryService poetryService;

    @PostMapping
    public Long create(@RequestBody PoetryDto.CreateRequest request) {
        return poetryService.createArticle(request);
    }

    @PostMapping("/{id}/lines")
    public void addLine(@PathVariable Long id, @RequestBody PoetryDto.AddLineRequest request) {
        poetryService.addRelayLine(id, request);
    }

    @GetMapping
    public List<PoetryDto.ListResponse> list(@RequestParam ArticleType type) {
        return poetryService.getList(type);
    }

    @GetMapping("/{id}")
    public PoetryDto.DetailResponse detail(@PathVariable Long id) {
        return poetryService.getDetail(id);
    }
}