package politikk_statistikk.backend.controllers;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import politikk_statistikk.backend.data.responses.PoliticianSubjectVotesResponse;
import politikk_statistikk.backend.service.PoliticianSubjectVoteFetcher;

@RestController
public class PoliticianSubjectVoteController {
    private final JdbcTemplate jdbcTemplate;

    public PoliticianSubjectVoteController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/api/politician-votes/get-politician-votes-for-subject/{politicianId}")
    public PoliticianSubjectVotesResponse getPoliticianSubjectVotes(@PathVariable String politicianId) {
        PoliticianSubjectVoteFetcher psvf = new PoliticianSubjectVoteFetcher(jdbcTemplate);
        return psvf.fetchPoliticianSubjectVotes(politicianId);
    }
}
