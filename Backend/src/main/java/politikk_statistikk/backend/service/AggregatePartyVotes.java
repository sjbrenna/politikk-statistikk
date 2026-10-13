package politikk_statistikk.backend.service;

import politikk_statistikk.backend.data.PartyVote;

public class AggregatePartyVotes {


    public PartyVote votes() {
        return new PartyVote(
                "Test",
                20,
                10
        );
    }
}
