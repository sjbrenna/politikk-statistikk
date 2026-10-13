package politikk_statistikk.backend.data;

import java.util.List;

public record PartyVotingStats(
        String period,
        Integer subjectId,
        String subjectName,
        List<PartyVote> partyVotes
) {
}
