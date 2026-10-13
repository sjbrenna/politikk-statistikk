package politikk_statistikk.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import politikk_statistikk.backend.data.Party;
import politikk_statistikk.backend.data.PartyVote;
import politikk_statistikk.backend.service.AggregatePartyVotes;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

@RestController
public class PartyVoteController {
    private final JdbcTemplate jdbcTemplate;

    public PartyVoteController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @GetMapping(value = "/api/party-votes/get-parties-votes-for-subject/{subjectId}")
    public PartyVote partyVote(@PathVariable int subjectId) {
        AggregatePartyVotes aggregatePartyVotes = new AggregatePartyVotes();
        return aggregatePartyVotes.votes();
    }

    @GetMapping("/parties")
    public List<Party> getParties() {
        String sql = "select id, name FROM \"Party\" ORDER BY id";
        return jdbcTemplate.query(
                sql,
                (rs, _) -> new Party(
                        rs.getString("id"),
                        rs.getString("name")
                )
        );
    }
}
