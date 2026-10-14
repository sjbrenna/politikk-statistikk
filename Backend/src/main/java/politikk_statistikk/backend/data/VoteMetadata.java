package politikk_statistikk.backend.data;

public record VoteMetadata(
        String caseId,
        String politicianId,
        VoteOptions vote
) {
}
