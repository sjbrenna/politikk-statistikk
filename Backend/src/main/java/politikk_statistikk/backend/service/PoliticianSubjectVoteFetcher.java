package politikk_statistikk.backend.service;

import org.springframework.jdbc.core.JdbcTemplate;
import politikk_statistikk.backend.config.AppConfig;
import politikk_statistikk.backend.data.responses.PoliticianSubjectVotesResponse;
import politikk_statistikk.backend.data.responses.SubjectVote;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

public class PoliticianSubjectVoteFetcher {
    private final JdbcTemplate jdbcTemplate;

    public PoliticianSubjectVoteFetcher(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public PoliticianSubjectVotesResponse fetchPoliticianSubjectVotes(
            String politicianId) {

        String sql = """
        SELECT
            s.name AS subject_name,
            s.id AS subject_id,
            COUNT(*) FILTER (WHERE vr.vote = 'for') AS votes_for,
            COUNT(*) FILTER (WHERE vr.vote = 'mot') AS votes_against
        FROM "VoteRecord" vr
        JOIN "CaseSubject" cs
            ON vr."caseID" = cs."caseMetadataId"
        JOIN "Subject" s
            ON s.id = cs."subjectId"
        WHERE vr."politicianID" = ?
          AND vr.vote IN ('for', 'mot')
          AND EXISTS (
              SELECT 1
              FROM "FinalVoting" fv
              WHERE fv."votingID" = vr."votingID"
          )
        GROUP BY s.id, s.name
        """;

        List<SubjectVote> subjectVotes = jdbcTemplate.query(
                sql,
                (rs, rowNum) -> new SubjectVote(
                        rs.getInt("subject_id"),
                        rs.getString("subject_name"),
                        rs.getInt("votes_for"),
                        rs.getInt("votes_against")
                ),
                politicianId
        );
        return new PoliticianSubjectVotesResponse(
                politicianId,
                AppConfig.CURRENT_PERIOD,
                subjectVotes
        );
    }




}
