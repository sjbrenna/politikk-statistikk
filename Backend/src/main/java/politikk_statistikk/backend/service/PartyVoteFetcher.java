package politikk_statistikk.backend.service;

import politikk_statistikk.backend.config.AppConfig;
import politikk_statistikk.backend.data.PartyVote;
import politikk_statistikk.backend.data.PartyVotingStats;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Repository
public class PartyVoteFetcher {
    private final JdbcTemplate jdbcTemplate;

    public PartyVoteFetcher(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public PartyVotingStats getPartyVotes(Integer subjectId) {
        //fetch for the subject

        String sqlSubject = """
            SELECT
                name,
                id
            FROM "Subject"
            WHERE id = ?
""";

        List<String> subjects = jdbcTemplate.query(
                sqlSubject,
                (rs, rowNum) -> rs.getString("name"),
                subjectId
        );

        if (subjects.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Subject not found: " + subjectId
            );
        }

        String subjectName = subjects.getFirst();

        String sql = """
        SELECT
            p."partyId" AS party_id,
            COUNT(*) FILTER (WHERE vr.vote = 'for') AS votes_for,
            COUNT(*) FILTER (WHERE vr.vote = 'mot') AS votes_against
        FROM "VoteRecord" vr
        JOIN "Politician" p
            ON vr."politicianID" = p.id
        WHERE vr.vote IN ('for', 'mot')
        AND EXISTS (
                  SELECT 1
                  FROM "FinalVoting" fv
                  WHERE fv."votingID" = vr."votingID"
              )
        AND EXISTS (
            SELECT 1
            FROM "CaseSubject" cs
            WHERE cs."caseMetadataId" = vr."caseID"
              AND cs."subjectId" = ?
        )
    GROUP BY p."partyId"
    """;

        List<PartyVote> partyVotes = jdbcTemplate.query(
                sql,
                (rs, rowNum) -> new PartyVote(
                        rs.getString("party_id"),
                        rs.getInt("votes_for"),
                        rs.getInt("votes_against")
                ),
                subjectId
        );

        return new PartyVotingStats(
                AppConfig.CURRENT_PERIOD,
                subjectId,
                subjectName,
                partyVotes
        );
    }
}
