package politikk_statistikk.backend.PartyVote;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PartyVoteController {
    @GetMapping(value = "/api/party-votes/get-parties-votes-for-subject/{subjectId}")
    public String partyVote(@PathVariable int subjectId) {
        return "Party " + subjectId;
    }

    @GetMapping("/hi")
    public String hello() {
        return "Hello World";
    }
}
