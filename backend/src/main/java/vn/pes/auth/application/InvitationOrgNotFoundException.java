package vn.pes.auth.application;

public final class InvitationOrgNotFoundException extends RuntimeException {

    public InvitationOrgNotFoundException() {
        super("Invitation organization was not found.");
    }
}
