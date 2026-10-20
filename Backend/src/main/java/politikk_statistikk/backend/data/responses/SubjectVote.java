package politikk_statistikk.backend.data;

public record SubjectVote(
        Integer subjectId,
        Integer votesFor,
        Integer votesAgainst
) {
}
