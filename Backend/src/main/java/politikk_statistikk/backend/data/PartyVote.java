package politikk_statistikk.backend.data;

public record PartyVote(
        String partyName,
        Integer votesFor,
        Integer votesAgainst
) {
}
