package vn.pes.auth.application;

public final class InvalidInvitationException extends RuntimeException {

    public InvalidInvitationException() {
        super("Invitation is invalid.");
    }
}
