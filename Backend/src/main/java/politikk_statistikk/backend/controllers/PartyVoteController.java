package politikk_statistikk.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import politikk_statistikk.backend.data.Party;
import org.springframework.jdbc.core.JdbcTemplate;
import politikk_statistikk.backend.data.PartyVotingStats;
import politikk_statistikk.backend.service.PartyVoteFetcher;

import java.util.List;

@RestController
public class PartyVoteController {
    private final JdbcTemplate jdbcTemplate;

    public PartyVoteController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @GetMapping(value = "/api/party-votes/get-parties-votes-for-subject/{subjectId}")
    public PartyVotingStats partyVote(@PathVariable int subjectId) {
        PartyVoteFetcher pvf = new PartyVoteFetcher(jdbcTemplate);
        return pvf.getPartyVotes(subjectId);
    }

    @GetMapping("/parties")
    public List<Party> getParties() {
        String sql = "select id, name FROM \"Party\" ORDER BY id";
        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> new Party(
                        rs.getString("id"),
                        rs.getString("name")
                )
        );
    }
}
