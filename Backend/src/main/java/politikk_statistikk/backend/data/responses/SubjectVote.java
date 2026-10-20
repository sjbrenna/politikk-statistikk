package politikk_statistikk.backend.data.responses;

public record SubjectVote(
        Integer subjectId,
        String subjectName,
        Integer votesFor,
        Integer votesAgainst
) {
}
