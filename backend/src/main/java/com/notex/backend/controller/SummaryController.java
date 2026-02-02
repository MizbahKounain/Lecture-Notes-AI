package com.notex.backend.controller;

import com.notex.backend.service.AiService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SummaryController {

    private final AiService aiService;

    public SummaryController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping(value = "/summarize", consumes = "text/plain")
    public String summarize(@RequestBody String transcript) throws Exception {
        return aiService.cleanAndSummarize(transcript);
    }

    @PostMapping(value = "/study-mode", consumes = "text/plain")
    public String studyMode(@RequestBody String notes) throws Exception {
        return aiService.generateStudyNotes(notes);
    }

}
