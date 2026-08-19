package vn.pes.auth.application;

public final class InvitationOrgNotTieuDoiException extends RuntimeException {

    public InvitationOrgNotTieuDoiException() {
        super("Invitation organization must be a Tieu doi.");
    }
}
