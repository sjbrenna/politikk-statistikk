package politikk_statistikk.backend.data.responses;

import java.util.List;

public record PoliticianSubjectVotesResponse(
        String politicianId,
        String period,
        List<SubjectVote> subjectVotes
) {
}
