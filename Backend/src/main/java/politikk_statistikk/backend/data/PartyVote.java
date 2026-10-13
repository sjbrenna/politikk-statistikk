package politikk_statistikk.backend.PartyVote;

public record PartyVote(
        String partyName,
        Integer votesFor,
        Integer votesAgainst
) {
}
