package politikk_statistikk.backend.data;

import com.fasterxml.jackson.annotation.JsonValue;

public enum VoteOptions {
    FOR("for"),
    MOT("mot"),
    IKKE_TILSTEDE("ikke_tilstede");

    private final String value;

    VoteOptions(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    public static VoteOptions fromValue(String value) {
        for (VoteOptions option : values()) {
            if (option.value.equals(value)) {
                return option;
            }
        }

        throw new IllegalArgumentException("Unknown vote: " + value);
    }
}